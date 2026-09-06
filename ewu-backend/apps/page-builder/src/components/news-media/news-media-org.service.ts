// news-media-org/news-media-org.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import {
  CreateNewsMediaOrgInput,
  UpdateNewsMediaOrgInput,
} from './dto/news-media-org.input';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'apps/user-service/src/utils/file-upload.util';
import { join } from 'path';

@Injectable()
export class NewsMediaOrgService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'news-media', 'files');

  constructor(private readonly prisma: PrismaPageBuilderService) {}

  async create(createInput: CreateNewsMediaOrgInput) {
    let thumbnailUrl: string | undefined;
    if (createInput.thumbnail) {
      const thumbFile: any = await createInput.thumbnail;
      const thumbName = `${Date.now()}_${thumbFile.filename}`;
      thumbnailUrl = await uploadFileStream(
        thumbFile.createReadStream,
        this.uploadDir,
        thumbName,
      );
    }
    return this.prisma.newsMediaOrg.create({
      data: {
        ...createInput,
        thumbnail: thumbnailUrl,
      },
    });
  }

  async findAll() {
    return this.prisma.newsMediaOrg.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.newsMediaOrg.findUnique({ where: { id } });
  }

  async update(id: number, updateInput: UpdateNewsMediaOrgInput) {
    const existing = await this.prisma.newsMediaOrg.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`NewsMediaOrg with ID ${id} not found`);
    }

    let newThumb = existing?.thumbnail;
    if (updateInput?.thumbnail) {
      if (existing?.thumbnail) {
        const prevPath = existing.thumbnail.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPath);
      }
      const thumbFile: any = await updateInput.thumbnail;
      const thumbName = `${Date.now()}_${thumbFile.filename}`;
      newThumb = await uploadFileStream(
        thumbFile.createReadStream,
        this.uploadDir,
        thumbName,
      );
    }
    return this.prisma.newsMediaOrg.update({
      where: { id },
      data: { 
        ...updateInput,
        thumbnail: newThumb,
      },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.newsMediaOrg.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`NewsMediaOrg with ID ${id} not found`);
    }
    return this.prisma.newsMediaOrg.delete({ where: { id } });
  }
}
