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
  uploadFileStream,
  deleteFileAndDirectory,
} from 'utils/file-upload.util';
import { join } from 'path';
import { AboutOrg } from './entities/about-org.entity';
import {
  CreateAboutOrgInput,
  UpdateAboutOrgInput,
} from './dto/about-org.input';

@Injectable()
export class AboutOrgService {
  private logger = new Logger('AboutOrgService');
  private uploadDir = join(process.env.UPLOAD_DIR, 'about-org', 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
  ) {}

  private async getFilePath(input: any, key: string): Promise<string> {
    if (input[key]) {
      const file: any = await input[key];
      const fileName = `${Date.now()}_${file.filename}`;
      return uploadFileStream(file.createReadStream, this.uploadDir, fileName);
    }
    return '';
  }

  async create(input: CreateAboutOrgInput, userId: number): Promise<AboutOrg> {
    try {
      const mediaUrl = await this.getFilePath(input, 'mediaUrl');
      return this.prisma.aboutOrg.create({
        data: {
          ...input,
          mediaUrl,
          createdBy: userId,
        },
      });
    } catch (e) {
      this.logger.error(`Error creating AboutOrg: ${e}`);
      throw new HttpException(
        'Error creating AboutOrg',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<AboutOrg[]> {
    return this.prisma.aboutOrg.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number): Promise<AboutOrg> {
    const record = await this.prisma.aboutOrg.findUnique({ where: { id } });
    if (!record)
      throw new NotFoundException(`AboutOrg with ID ${id} not found`);
    return record;
  }

  async update(
    id: number,
    input: UpdateAboutOrgInput,
    userId: number,
  ): Promise<AboutOrg> {
    const existing = await this.findOne(id);

    let data: any = { ...input, mediaUrl: existing.mediaUrl };

    if (input.mediaUrl) {
      if (existing.mediaUrl) {
        const oldPath = existing.mediaUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(oldPath);
      }
      data.mediaUrl = await this.getFilePath(input, 'mediaUrl');
    }

    return this.prisma.aboutOrg.update({
      data: { ...data, updatedBy: userId },
      where: { id },
    });
  }

  async remove(id: number): Promise<AboutOrg> {
    const existing = await this.findOne(id);
    await this.prisma.aboutOrg.delete({ where: { id } });

    if (existing.mediaUrl) {
      const oldPath = existing.mediaUrl.replace(`${process.env.BASE_URL}/`, '');
      deleteFileAndDirectory(oldPath);
    }
    return existing;
  }
}
