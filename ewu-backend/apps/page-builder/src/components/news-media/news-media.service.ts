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
  CreateNewsMediaInput,
  CreateNewsMediaFileInput,
  UpdateNewsMediaInput,
} from './dto/news-media.input';
import { NewsMedia, NewsMediaFile } from './entities/news-media.entity';
import * as path from 'path';
import {
  uploadFileStream,
  deleteFileAndDirectory,
} from 'utils/file-upload.util';

@Injectable()
export class NewsMediaService {
  private logger = new Logger('NewsMediaService');
  private uploadDir = path.join(process.env.UPLOAD_DIR, 'news-media', 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
  ) {}

  /** ------------------- CREATE ------------------- */
  async create(
    input: CreateNewsMediaInput,
    userId: number,
  ): Promise<NewsMedia> {
    try {
      /** Handle thumbnail */
      let thumbnailUrl: string | null = null;
      if (input.thumbnail) {
        const f: any = await input.thumbnail;
        const fn = `${Date.now()}_${f.filename}`;
        thumbnailUrl = await uploadFileStream(
          f.createReadStream,
          this.uploadDir,
          fn,
        );
      }

      /** Handle files (multi) */
      const files: NewsMediaFile[] = input.files
        ? await Promise.all(
            input.files.map(
              async (file: CreateNewsMediaFileInput, idx: number) => {
                let fileUrl: string | null = null;
                let thumbNailUrl: string | null = null;

                if (file.fileUrl) {
                  const f: any = await file.fileUrl;
                  const fn = `${Date.now()}_${idx}_${f.filename}`;
                  fileUrl = await uploadFileStream(
                    f.createReadStream,
                    this.uploadDir,
                    fn,
                  );
                }

                if (file.thumbNailUrl) {
                  const f: any = await file.thumbNailUrl;
                  const fn = `${Date.now()}_${idx}_thumb_${f.filename}`;
                  thumbNailUrl = await uploadFileStream(
                    f.createReadStream,
                    this.uploadDir,
                    fn,
                  );
                }

                return {
                  orgName: file.orgName ?? null,
                  link: file.link ?? null,
                  fileUrl,
                  thumbNailUrl,
                  createdBy: userId,
                } as any;
              },
            ),
          )
        : [];

      return this.prisma.newsMedia.create({
        data: {
          ...input,
          thumbnail: thumbnailUrl,
          createdBy: userId,
          files: { create: files },
        },
        include: { files: true },
      });
    } catch (e) {
      this.logger.error('Create NewsMedia error', e);
      throw new HttpException(
        `Error creating NewsMedia: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** ------------------- FIND ALL ------------------- */
  async findAll(page = 1, limit = 20): Promise<NewsMedia[]> {
    const skip = (page - 1) * limit;
    return this.prisma.newsMedia.findMany({
      orderBy: { date: 'desc' },
      skip,
      take: limit,
      include: { files: true },
    });
  }

  /** ------------------- FIND ONE ------------------- */
  async findOne(id: number): Promise<NewsMedia> {
    const item = await this.prisma.newsMedia.findUnique({
      where: { id },
      include: { files: true },
    });
    if (!item) throw new NotFoundException(`NewsMedia ID ${id} not found`);
    return item;
  }

  /** ------------------- UPDATE ------------------- */
  async update(
    id: number,
    input: UpdateNewsMediaInput,
    userId: number,
  ): Promise<NewsMedia> {
    try {
      const existing = await this.findOne(id);

      /** Handle thumbnail replacement */
      let thumbnailUrl = existing?.thumbnail;
      if (input.thumbnail) {
        if (existing.thumbnail) {
          const prev = existing.thumbnail.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prev);
        }
        const f: any = await input.thumbnail;
        const fn = `${Date.now()}_${f.filename}`;
        thumbnailUrl = await uploadFileStream(
          f.createReadStream,
          this.uploadDir,
          fn,
        );
      }

      /** Replace files */
      let files: NewsMediaFile[] = [];
      if (input.files) {
        // delete old files
        if (existing.files?.length) {
          for (const f of existing.files) {
            if (f.fileUrl) {
              const p = f.fileUrl.replace(`${process.env.BASE_URL}/`, '');
              deleteFileAndDirectory(p);
            }
            if (f.thumbNailUrl) {
              const p = f.thumbNailUrl.replace(`${process.env.BASE_URL}/`, '');
              deleteFileAndDirectory(p);
            }
          }
          await this.prisma.newsMediaFile.deleteMany({
            where: { newsMediaId: id },
          });
        }

        // add new files
        files = await Promise.all(
          input.files.map(async (file, idx) => {
            let fileUrl: string | null = null;
            let thumbNailUrl: string | null = null;

            if (file.fileUrl) {
              const f: any = await file.fileUrl;
              const fn = `${Date.now()}_${idx}_${f.filename}`;
              fileUrl = await uploadFileStream(
                f.createReadStream,
                this.uploadDir,
                fn,
              );
            }

            if (file.thumbNailUrl) {
              const f: any = await file.thumbNailUrl;
              const fn = `${Date.now()}_${idx}_thumb_${f.filename}`;
              thumbNailUrl = await uploadFileStream(
                f.createReadStream,
                this.uploadDir,
                fn,
              );
            }

            return {
              orgName: file.orgName ?? null,
              link: file.link ?? null,
              fileUrl,
              thumbNailUrl,
              updatedBy: userId,
            } as any;
          }),
        );
      }

      return this.prisma.newsMedia.update({
        where: { id },
        data: {
          ...input,
          thumbnail: thumbnailUrl,
          updatedBy: userId,
          files: { deleteMany: {}, create: files },
        },
        include: { files: true },
      });
    } catch (e) {
      this.logger.error('Update NewsMedia error', e);
      throw new HttpException(
        `Error updating NewsMedia: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** ------------------- DELETE ------------------- */
  async delete(id: number): Promise<NewsMedia> {
    const existing = await this.findOne(id);

    // remove thumbnail
    if (existing.thumbnail) {
      const p = existing.thumbnail.replace(`${process.env.BASE_URL}/`, '');
      deleteFileAndDirectory(p);
    }

    // remove files
    if (existing.files?.length) {
      for (const f of existing.files) {
        if (f.fileUrl) {
          const p = f.fileUrl.replace(`${process.env.BASE_URL}/`, '');
          deleteFileAndDirectory(p);
        }
        if (f.thumbNailUrl) {
          const p = f.thumbNailUrl.replace(`${process.env.BASE_URL}/`, '');
          deleteFileAndDirectory(p);
        }
      }
    }

    await this.prisma.newsMedia.delete({ where: { id } });
    return existing;
  }
}
