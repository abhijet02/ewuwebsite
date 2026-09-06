import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import {
  CreateOfficeMemberDocumentInput,
  UpdateOfficeMemberDocumentInput,
} from './dto/office-member-document.input';

@Injectable()
export class OfficeMemberDocumentService {
  private uploadDir = join(
    process.env.UPLOAD_DIR,
    'office-member',
    'documents',
  );

  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateOfficeMemberDocumentInput, userId: number) {
    try {
      let savedFilePath = null;

      if (input?.filePath) {
        const file: any = await input.filePath;
        const fileName = `${Date.now()}_${file.filename}`;
        const filePath = await uploadFileStream(
          file.createReadStream,
          this.uploadDir,
          fileName,
        );
        savedFilePath = filePath;
        input.fileName = input.fileName ?? file.filename;
      }

      const created = await this.prisma.officeMemberDocument.create({
        data: {
          ...input,
          filePath: savedFilePath,
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
    return await this.prisma.officeMemberDocument.findMany({
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const doc = await this.prisma.officeMemberDocument.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new NotFoundException(
        `office Member Document with ID ${id} not found`,
      );
    }

    return doc;
  }

  async update(
    id: number,
    input: UpdateOfficeMemberDocumentInput,
    userId: number,
  ) {
    const existing = await this.findOne(id);

    const updatedInput: any = {
      ...input,
      filePath: existing?.filePath,
      fileName: input?.fileName ?? existing?.fileName,
    };

    if (input?.filePath) {
      if (existing.filePath) {
        const prevPath = existing.filePath.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPath);
      }

      const file: any = await input.filePath;
      const fileName = `${Date.now()}_${file.filename}`;
      const filePath = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );
      updatedInput.filePath = filePath;
      updatedInput.fileName = input.fileName ?? file.filename;
    }

    const updated = await this.prisma.officeMemberDocument.update({
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
    await this.prisma.officeMemberDocument.delete({ where: { id } });

    if (existing.filePath) {
      const prevPath = existing.filePath.replace(
        `${process.env.BASE_URL}/`,
        '',
      );
      deleteFileAndDirectory(prevPath);
    }

    return existing;
  }
}
