import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import {
  CreateOfficeDocumentInput,
  UpdateOfficeDocumentInput,
} from './dto/office-document.input';
import { OfficeDocument } from './entities/office-document.entity';

@Injectable()
export class OfficeDocumentService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'office', 'documents');

  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateOfficeDocumentInput, userId: number) {
    try {
      let savedFilePath = null;

      if (input?.fileUrl) {
        const file: any = await input.fileUrl;
        const fileName = `${file.filename}`;
        const filePath = await uploadFileStream(
          file.createReadStream,
          this.uploadDir,
          fileName,
        );
        savedFilePath = filePath;
      }

      const created = await this.prisma.officeDocument.create({
        data: {
          ...input,
          fileUrl: savedFilePath,
          createdBy: userId,
        },
      });

      return created;
    } catch (e) {
      throw new HttpException(
        `Error Creating office Member Document: ${e}`,
        500,
      );
    }
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.prisma.officeDocument.findMany({
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const doc = await this.prisma.officeDocument.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new NotFoundException(
        `office Member Document with ID ${id} not found`,
      );
    }

    return doc;
  }

  async findByOfficeId(id: number): Promise<OfficeDocument[]> {
    const doc = await this.prisma.officeDocument.findMany({
      where: { officeId: id },
    });
    return doc;
  }

  async update(id: number, input: UpdateOfficeDocumentInput, userId: number) {
    const existing = await this.findOne(id);

    const updatedInput: any = {
      ...input,
      fileUrl: existing?.fileUrl,
    };

    if (input?.fileUrl) {
      if (existing?.fileUrl) {
        const prevPath = existing?.fileUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPath);
      }

      const file: any = await input?.fileUrl;
      const fileName = `${file.filename}`;
      const filePath = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );
      updatedInput.fileUrl = filePath;
    }

    const updated = await this.prisma.officeDocument.update({
      where: { id },
      data: {
        ...updatedInput,
        updatedBy: userId,
      },
    });

    return updated;
  }

  async remove(id: number) {
    const existing = await this.findOne(id);
    await this.prisma.officeDocument.delete({ where: { id } });

    if (existing?.fileUrl) {
      const prevPath = existing?.fileUrl.replace(
        `${process.env.BASE_URL}/`,
        '',
      );
      deleteFileAndDirectory(prevPath);
    }

    return existing;
  }
}
