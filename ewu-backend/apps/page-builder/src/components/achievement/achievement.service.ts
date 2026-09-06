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
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementInput } from './dto/create-achievement.input';
import { UpdateAchievementInput } from './dto/update-achievement.input';

@Injectable()
export class AchievementService {
  private logger = new Logger('Achievement  service');
  //
  private uploadDir = join(process.env.UPLOAD_DIR, `achievement`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(
    createAchievementInput: CreateAchievementInput,
    userId: number,
  ): Promise<Achievement> {
    try {
      let photos: string[] = [];

      const isSlugExist = await this.findBySlug(createAchievementInput?.slug);
      if (isSlugExist)
        throw new HttpException('Slug already exist', HttpStatus.BAD_REQUEST);

      if (createAchievementInput?.photos) {
        const imagePaths = createAchievementInput?.photos.map(
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

      let thumbnailUrl = null;

      if (createAchievementInput?.thumbnail) {
        const thumbnailFile: any = await createAchievementInput.thumbnail;
        const thumbnailFileName = `${Date.now()}_${thumbnailFile.filename}`;
        const thumbnailFilePath = await uploadFileStream(
          thumbnailFile.createReadStream,
          this.uploadDir,
          thumbnailFileName,
        );

        thumbnailUrl = await thumbnailFilePath;
      }

      const createdAchievementdata = this.prismaService.achievement.create({
        data: {
          ...createAchievementInput,
          thumbnail: thumbnailUrl,
          photos: {
            create: photos?.map((url) => ({ url, createdBy: userId })),
          },
          createdBy: userId,
        },
        include: { photos: true },
      });

      this.logger.log(`Achievement Data: ${createdAchievementdata}`);
      return createdAchievementdata;
    } catch (e) {
      throw new HttpException(`Error Creating Achievement: ${e}`, 500);
    }
  }

  async findAll(page: number = 1, limit: number = 20, pageId?: number): Promise<Achievement[]> {
    const skip = (page - 1) * limit;
     const whereCondition = pageId ? { 
        OR: [
          { pageId: pageId }, // Original pageId
          { isCopiedTo: { has: pageId } } // Or in copied to array
        ]
      } : {};
    return this.prismaService.achievement.findMany({
      orderBy: { date: 'desc' },
      where: whereCondition,
      skip,
      take: limit,
      include: { photos: true },
    });
  }

  async findOne(id: number): Promise<Achievement> {
    const news = await this.prismaService.achievement.findUnique({
      where: { id },
      include: { photos: true },
    });

    if (!news)
      throw new NotFoundException(`Achievement with ID ${id} not found`);

    return news;
  }

  async findBySlug(slug: string): Promise<Achievement> {
    const news = await this.prismaService.achievement.findUnique({
      where: { slug },
      include: { photos: true },
    });

    return news;
  }

  async update(
    id: number,
    updateAchievementInput: UpdateAchievementInput,
    userId: number,
  ): Promise<Achievement> {
    try {
      const isAchievementExist: Achievement =
        await this.prismaService.achievement.findUnique({
          where: {
            id,
          },
        });
      if (isAchievementExist) {
        let photos: string[] = [];
        let achievementInputData = {
          ...updateAchievementInput,
          thumbnail: isAchievementExist.thumbnail,
          photos: isAchievementExist.photos,
        };

        if (updateAchievementInput?.thumbnail) {
          if (isAchievementExist?.thumbnail) {
            const prevthumbnailfilePath = isAchievementExist.thumbnail.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevthumbnailfilePath);
          }
          const imageFile: any = await updateAchievementInput.thumbnail;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          achievementInputData = {
            ...achievementInputData,
            thumbnail: await filePath,
          };
        }
        if (isAchievementExist?.photos) {
          isAchievementExist?.photos.map(async (photo) => {
            const prevlogofilePath = photo.url.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevlogofilePath);
          });
          for (const photo of isAchievementExist?.photos) {
            await this.prismaService.achievementPhoto.delete({
              where: { id: photo.id },
            });
          }
        }
        if (updateAchievementInput?.photos) {
          // if (isAchievementExist?.photos) {
          //   isAchievementExist?.photos.map(async (photo) => {
          //     const prevlogofilePath = photo.url.replace(
          //       `${process.env.BASE_URL}/`,
          //       '',
          //     );
          //     deleteFileAndDirectory(prevlogofilePath);
          //   });
          //   for (const photo of isAchievementExist?.photos) {
          //     await this.prismaService.achievementPhoto.delete({
          //       where: { id: photo.id },
          //     });
          //   }
          // }

          const imagePaths = updateAchievementInput.photos.map(
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
        const updatedAchievementData =
          await this.prismaService.achievement.update({
            data: {
              ...achievementInputData,
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
        return updatedAchievementData;
      } else {
        throw new HttpException(
          'Achievement not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Updating Achievement: ${e}`, 500);
    }
  }

  async delete(id: number): Promise<Achievement> {
    const isAchievementExist = await this.findOne(id); // Ensure the notice exists
    if (isAchievementExist) {
      await this.prismaService.achievement.delete({ where: { id } });
      if (isAchievementExist?.thumbnail) {
        const prevthumbnailfilePath = isAchievementExist.thumbnail.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevthumbnailfilePath);
      }
      if (isAchievementExist?.photos) {
        isAchievementExist?.photos.map(async (photo) => {
          const prevphotofilePath = photo.url.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevphotofilePath);
        });
      }

      return isAchievementExist;
    } else {
      throw new HttpException('Achievement not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
