import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateWhyChooseDepartmentInput,
  UpdateWhyChooseDepartmentInput,
} from './dto/why-choose-department.input';

import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { WhyChooseDepartment } from './entities/why-choose-department.entity';

@Injectable()
export class WhyChooseDepartmentService {
  private uploadDir = join(
    process.env.UPLOAD_DIR,
    `why-choose-department`,
    'files',
  );

  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(createInput: CreateWhyChooseDepartmentInput, userId: number) {
    let photoPath = null;

    if (createInput?.photoUrl) {
      const imageFile: any = await createInput.photoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      photoPath = await filePath;
    }

    return await this.prisma.whyChooseDepartment.create({
      data: {
        ...createInput,
        photoUrl: photoPath,
        createdBy: userId,
        updatedBy: userId,
      },
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return await this.prisma.whyChooseDepartment.findMany({
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.whyChooseDepartment.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `WhyChooseDepartment with ID ${id} not found`,
      );
    }
    return record;
  }

  async update(
    id: number,
    updateInput: UpdateWhyChooseDepartmentInput,
    userId: number,
  ) {
    const existing = await this.prisma.whyChooseDepartment.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Error Updating: Id ${id} not found`);
    }

    let updateData = {
      ...updateInput,
      photoUrl: existing.photoUrl,
    };

    if (updateInput?.photoUrl) {
      // Delete old file if exists
      if (existing?.photoUrl) {
        const prevPhotoPath = existing.photoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      const imageFile: any = await updateInput.photoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      const photoUrl = await filePath;

      updateData = {
        ...updateInput,
        photoUrl,
      };
    }

    return await this.prisma.whyChooseDepartment.update({
      where: { id },
      data: {
        ...updateData,
        updatedBy: userId,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    try {
      const record: WhyChooseDepartment = await this.findOne(id);
      if (record) {
        await this.prisma.whyChooseDepartment.delete({ where: { id } });
        if (record.photoUrl) {
          const prevPhotoPath = record.photoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }
        return record;
      }
    } catch (e) {
      throw new HttpException(`Error Deleting WhyChooseDepartment: ${e}`, 500);
    }
  }
}
