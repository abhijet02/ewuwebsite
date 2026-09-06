import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateFacultyMemberDocumentInput,
  UpdateFacultyMemberDocumentInput,
} from './dto/faculty-member-document.input';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';

@Injectable()
export class FacultyMemberDocumentService {
  private uploadDir = join(
    process.env.UPLOAD_DIR,
    'faculty-member',
    'documents',
  );

  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateFacultyMemberDocumentInput, userId: number) {
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

      const created = await this.prisma.facultyMemberDocument.create({
        data: {
          ...input,
          filePath: savedFilePath,
          createdBy: userId,
        },
      });

      return created;
    } catch (e) {
      throw new HttpException(
        `Error Creating FacultyMemberDocument: ${e}`,
        500,
      );
    }
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.prisma.facultyMemberDocument.findMany({
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const doc = await this.prisma.facultyMemberDocument.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new NotFoundException(
        `FacultyMemberDocument with ID ${id} not found`,
      );
    }

    return doc;
  }

  async update(
    id: number,
    input: UpdateFacultyMemberDocumentInput,
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

    const updated = await this.prisma.facultyMemberDocument.update({
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
    await this.prisma.facultyMemberDocument.delete({ where: { id } });

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
