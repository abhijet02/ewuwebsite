import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';

import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@Injectable()
export class NewsService {
  private logger = new Logger('News  service');
  private uploadDir = join(process.env.UPLOAD_DIR, `news`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  private async autoArchiveIfExpired(news: News): Promise<any> {
    if (!news) return null;

    const newsDate = new Date(news.date);
    const twoYearLater = new Date(newsDate);
    twoYearLater.setFullYear(twoYearLater.getFullYear() + 2);

    const now = new Date();
    const isExpired = now >= twoYearLater;

    if (isExpired && news.isArchived === YesOrNo.NO) {
      return this.prismaService.news.update({
        where: { id: news.id },
        data: { isArchived: YesOrNo.YES },
        include: { photos: true },
      });
    }

    return news;
  }

  async create(
    createNewsInput: CreateNewsInput,
    userId: number,
  ): Promise<News> {
    try {
      let photos: string[] = [];

      const isSlugExist = await this.findBySlug(createNewsInput?.slug);
      if (isSlugExist)
        throw new HttpException('Slug already exist', HttpStatus.BAD_REQUEST);

      if (createNewsInput?.photos) {
        const imagePaths = createNewsInput?.photos.map(async (image, index) => {
          const imageFile: any = await image;
          const fileName = `${Date.now()}_${index}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          return filePath;
        });
        photos = await Promise.all(imagePaths);
      }

      const thumbnailFile: any = await createNewsInput.thumbnail;
      const thumbnailFileName = `${Date.now()}_${thumbnailFile.filename}`;
      const thumbnailFilePath = await uploadFileStream(
        thumbnailFile.createReadStream,
        this.uploadDir,
        thumbnailFileName,
      );

      const thumbnailUrl = await thumbnailFilePath;

      const createdNewsdata = this.prismaService.news.create({
        data: {
          ...createNewsInput,
          thumbnail: thumbnailUrl,
          photos: {
            create: photos?.map((url) => ({ url, createdBy: userId })),
          },
          createdBy: userId,
        },
        include: { photos: true },
      });

      this.logger.log(`News Data: ${createdNewsdata}`);
      return createdNewsdata;
    } catch (e) {
      throw new HttpException(`Error Creating News: ${e}`, 500);
    }
  }

  async findAll(page = 1, limit = 20, pageId?: number): Promise<News[]> {
    const skip = (page - 1) * limit;
    const whereCondition = pageId ? { 
        OR: [
          { pageId: pageId }, // Original pageId
          { isCopiedTo: { has: pageId } } // Or in copied to array
        ]
      } : {};
    const news = await this.prismaService.news.findMany({
      orderBy: { date: 'desc' },
      where: whereCondition,
      skip,
      take: limit,
      include: { photos: true },
    });

    return Promise.all(news?.map((n) => this.autoArchiveIfExpired(n)));
  }

  async findOne(id: number): Promise<News> {
    const news = await this.prismaService.news.findUnique({
      where: { id },
      include: { photos: true },
    });

    if (!news) throw new NotFoundException(`News with ID ${id} not found`);

    return this.autoArchiveIfExpired(news);
  }

  async findBySlug(slug: string): Promise<News> {
    const news = await this.prismaService.news.findUnique({
      where: { slug },
      include: { photos: true },
    });

    return news;
  }

  async update(
    id: number,
    updateNewsInput: UpdateNewsInput,
    userId: number,
  ): Promise<News> {
    try {
      const isNewsExist: News = await this.prismaService.news.findUnique({
        where: {
          id,
        },
      });
      if (isNewsExist) {
        let photos: string[] = [];
        let newsInputData = {
          ...updateNewsInput,
          thumbnail: isNewsExist.thumbnail,
          photos: isNewsExist.photos,
        };

        if (updateNewsInput?.thumbnail) {
          if (isNewsExist?.thumbnail) {
            const prevthumbnailfilePath = isNewsExist.thumbnail.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevthumbnailfilePath);
          }
          const imageFile: any = await updateNewsInput.thumbnail;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          newsInputData = {
            ...newsInputData,
            thumbnail: await filePath,
          };
        }
        if (isNewsExist?.photos) {
          // Delete exsisting photos to fix duplicate file entry
          for (const photo of isNewsExist.photos) {
            await this.prismaService.newsPhoto.deleteMany({
              where: {
                newsId: photo.newsId,
              },
            });
          }

          isNewsExist?.photos.map(async (photo) => {
            const prevlogofilePath = photo.url.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevlogofilePath);
          });
        }

        if (updateNewsInput?.photos) {
          const imagePaths = updateNewsInput.photos.map(
            async (image, index) => {
              const imageFile: any = await image;
              const fileName = `${Date.now()}_${index}_${imageFile.filename}`;
              const filePath = await uploadFileStream(
                imageFile.createReadStream,
                this.uploadDir,
                fileName,
              );
              return filePath;
            },
          );
          photos = await Promise.all(imagePaths);
        }
        const updatedNewsData = await this.prismaService.news.update({
          data: {
            ...newsInputData,
            updatedBy: userId,
            photos: {
              deleteMany: {},
              create: photos?.map((url) => ({ url, updatedBy: userId })),
            },
          },
          where: {
            id,
          },
          include: { photos: true },
        });
        return updatedNewsData;
      } else {
        throw new HttpException('News not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating News: ${e}`, 500);
    }
  }

  async delete(id: number): Promise<News> {
    const isNewsExist = await this.findOne(id); // Ensure the notice exists
    if (isNewsExist) {
      await this.prismaService.news.delete({ where: { id } });
      if (isNewsExist?.thumbnail) {
        const prevthumbnailfilePath = isNewsExist.thumbnail.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevthumbnailfilePath);
      }
      if (isNewsExist?.photos) {
        isNewsExist?.photos.map(async (photo) => {
          const prevphotofilePath = photo.url.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevphotofilePath);
        });
      }

      return isNewsExist;
    } else {
      throw new HttpException('News not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async removeNotice(id: number) {
    return this.prismaService.noticeCategory.delete({ where: { id } });
  }
}
