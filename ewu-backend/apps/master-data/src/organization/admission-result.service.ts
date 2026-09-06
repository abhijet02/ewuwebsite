import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateAdmissionResultInput,
  UpdateAdmissionResultInput,
} from './dto/admission-result.input';
import { uploadFileStream, deleteFileAndDirectory } from 'utils/file-upload.util';
import { join } from 'path';

@Injectable()
export class AdmissionResultService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'admission-results', 'files');

  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateAdmissionResultInput, userId: number) {
    try {
      let fileUrl = null;

      if (input?.fileUrl) {
        const file: any = await input.fileUrl;
        const fileName = `${Date.now()}_${file.filename}`;
        const path = await uploadFileStream(file.createReadStream, this.uploadDir, fileName);
        fileUrl = await path;
      }

      return await this.prisma.admissionResult.create({
        data: {
          ...input,
          fileUrl,
          createdBy: userId,
        },
      });
    } catch (error) {
      throw new HttpException(`Error creating admission result: ${error}`, 500);
    }
  }

  async findAll() {
    return this.prisma.admissionResult.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.admissionResult.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException(`AdmissionResult with ID ${id} not found`);
    }
    return result;
  }

  async update(id: number, input: UpdateAdmissionResultInput, userId: number) {
    const existing = await this.findOne(id);

    const updatedInput = {
      ...input,
      fileUrl: existing?.fileUrl,
    };

    if (input?.fileUrl) {
      if (existing?.fileUrl) {
        const prevFile = existing.fileUrl.replace(`${process.env.BASE_URL}/`, '');
        deleteFileAndDirectory(prevFile);
      }

      const file: any = await input.fileUrl;
      const fileName = `${Date.now()}_${file.filename}`;
      const path = await uploadFileStream(file.createReadStream, this.uploadDir, fileName);
      updatedInput.fileUrl = await path;
    }

    return await this.prisma.admissionResult.update({
      where: { id },
      data: {
        ...updatedInput,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number) {
    const existing = await this.findOne(id);

    if (existing?.fileUrl) {
      const filePath = existing.fileUrl.replace(`${process.env.BASE_URL}/`, '');
      deleteFileAndDirectory(filePath);
    }

    await this.prisma.admissionResult.delete({ where: { id } });

    return existing;
  }
}
