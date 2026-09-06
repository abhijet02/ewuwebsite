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
  CreateLatestNoticeInput,
  CreateLatestNoticePhotoInput,
} from '../dto/create-latest-notice.input';
import { UpdateLatestNoticeInput } from '../dto/update-latest-notice.input';
import { Notice, NoticePhoto } from '../entities/latest-notice.entity';

import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@Injectable()
export class LatestNoticeService {
  private logger = new Logger('Latest Notice  service');
  //
  private uploadDir = join(process.env.UPLOAD_DIR, `notice`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  private async autoArchiveIfExpired(notice: any): Promise<any> {
    if (!notice) return null;

    const noticeDate = new Date(notice.date);
    const twoYearLater = new Date(noticeDate);
    twoYearLater.setFullYear(twoYearLater.getFullYear() + 2);

    const now = new Date();
    const isExpired = now >= twoYearLater;

    if (isExpired && notice.isArchived === YesOrNo.NO) {
      return this.prismaService.notice.update({
        where: { id: notice.id },
        data: { isArchived: YesOrNo.YES },
        include: { photos: true },
      });
    }

    return notice;
  }

  async create(createNoticeInput: CreateLatestNoticeInput): Promise<Notice> {
    try {
      let photos: any[] = [];
      const isSlugExist = await this.findBySlug(createNoticeInput?.slug);
      if (isSlugExist)
        throw new HttpException('Slug already exist', HttpStatus.BAD_REQUEST);

      if (createNoticeInput?.photos) {
        const imagePaths = createNoticeInput?.photos.map(async (image) => {
          const imageFile: any = await image?.url;
          const fileName = `${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          return {
            url: await filePath,
            fileName: image?.fileName,
          };
        });
        photos = await Promise.all(imagePaths);
      }

      let attachmentUrl = null;

      if (createNoticeInput?.attachmentUrl) {
        const imageFile: any = await createNoticeInput?.attachmentUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );

        attachmentUrl = await filePath;
      }

      let thumbnailUrl = null;
      if (createNoticeInput?.thumbnail) {
        const thumbnailFile: any = await createNoticeInput.thumbnail;
        const thumbnailFileName = `${Date.now()}_${thumbnailFile.filename}`;
        const thumbnailFilePath = await uploadFileStream(
          thumbnailFile.createReadStream,
          this.uploadDir,
          thumbnailFileName,
        );

        thumbnailUrl = await thumbnailFilePath;
      }

      const createdNoticedata = this.prismaService.notice.create({
        data: {
          ...createNoticeInput,
          attachmentUrl,
          thumbnail: thumbnailUrl,
          sub_category: createNoticeInput.sub_category ?? '',
          photos: {
            create: photos?.map((url) => ({
              url: url.url,
              fileName: url.fileName,
            })),
          },
        },
        include: { photos: true },
      });

      this.logger.log(`Latest Notice Data: ${createdNoticedata}`);
      return createdNoticedata;
    } catch (e) {
      throw new HttpException(`Error Creating Latest Notice: ${e}`, 500);
    }
  }

  async findAll(page = 1, limit= 20, pageId?: number): Promise<Notice[]> {
    const skip = (page - 1) * limit;
     const whereCondition = pageId ? { 
        OR: [
          { pageId: pageId }, // Original pageId
          { isCopiedTo: { has: pageId } } // Or in copied to array
        ]
      } : {};
    const notices = await this.prismaService.notice.findMany({
      orderBy: { date: 'desc' },
      where: whereCondition,
      skip,
      take: limit,
      include: { photos: true },
    });
    return Promise.all(notices?.map((n) => this.autoArchiveIfExpired(n)));
  }

  async findOne(id: number): Promise<Notice> {
    const notice = await this.prismaService.notice.findUnique({
      where: { id },
      include: { photos: true },
    });

    if (!notice) throw new NotFoundException(`Notice with ID ${id} not found`);

    return this.autoArchiveIfExpired(notice);
  }

  async findBySlug(slug: string): Promise<Notice> {
    const notice = await this.prismaService.notice.findUnique({
      where: { slug },
      include: { photos: true },
    });

    return this.autoArchiveIfExpired(notice);
  }

  async update(
    id: number,
    updateNoticeInput: UpdateLatestNoticeInput,
  ): Promise<Notice> {
    try {
      const isNoticeExist: Notice = await this.prismaService.notice.findUnique({
        where: {
          id,
        },
      });
      if (isNoticeExist) {
        let photos: any[] = [];
        let noticeInputData = {
          ...updateNoticeInput,
          attachmentUrl: isNoticeExist.attachmentUrl,
          thumbnail: isNoticeExist.thumbnail,
          photos: isNoticeExist.photos,
        };
        if (updateNoticeInput?.attachmentUrl) {
          if (isNoticeExist?.attachmentUrl) {
            const prevlogofilePath = isNoticeExist.attachmentUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevlogofilePath);
          }
          const imageFile: any = await updateNoticeInput.attachmentUrl;
          const fileName = `${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          noticeInputData = {
            ...noticeInputData,
            attachmentUrl: await filePath,
          };
        }
        if (updateNoticeInput?.thumbnail) {
          if (isNoticeExist?.thumbnail) {
            const prevlogofilePath = isNoticeExist.thumbnail.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevlogofilePath);
          }
          const imageFile: any = await updateNoticeInput.thumbnail;
          const fileName = `${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          noticeInputData = {
            ...noticeInputData,
            thumbnail: await filePath,
          };
        }
        if (isNoticeExist?.photos) {
          isNoticeExist?.photos.map(async (photo) => {
            const prevlogofilePath = photo.url.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevlogofilePath);
          });
          for (const photo of isNoticeExist.photos) {
            await this.prismaService.noticePhoto.delete({
              where: {
                id: photo.id,
              },
            });
          }
        }
        if (updateNoticeInput?.photos) {
          const imagePaths = updateNoticeInput.photos.map(async (image) => {
            const imageFile: any = await image?.url;
            const fileName = `${imageFile.filename}`;
            const filePath = await uploadFileStream(
              imageFile.createReadStream,
              this.uploadDir,
              fileName,
            );
            return {
              url: await filePath,
              fileName: image?.fileName,
            };
          });
          photos = await Promise.all(imagePaths);
        }
        const updatedNoticeData = await this.prismaService.notice.update({
          data: {
            ...noticeInputData,
            photos: {
              deleteMany: {},
              create: photos?.map((p) => ({
                url: p.url,
                fileName: p.fileName,
              })),
            },
          },
          where: {
            id,
          },
          include: { photos: true },
        });
        return updatedNoticeData;
      } else {
        throw new HttpException('Activity not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Activity: ${e}`, 500);
    }
  }

  async delete(id: number): Promise<Notice> {
    const isNoticeExist = await this.findOne(id); // Ensure the notice exists
    if (isNoticeExist) {
      await this.prismaService.notice.delete({ where: { id } });
      if (isNoticeExist?.attachmentUrl) {
        const prevlogofilePath = isNoticeExist.attachmentUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevlogofilePath);
      }

      if (isNoticeExist?.thumbnail) {
        const prevlogofilePath = isNoticeExist.thumbnail.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevlogofilePath);
      }
      if (isNoticeExist?.photos) {
        isNoticeExist?.photos.map(async (photo, index) => {
          const prevlogofilePath = photo.url.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevlogofilePath);
        });
      }

      return isNoticeExist;
    } else {
      throw new HttpException('Notice not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async removeNotice(id: number) {
    return this.prismaService.noticeCategory.delete({ where: { id } });
  }
}
