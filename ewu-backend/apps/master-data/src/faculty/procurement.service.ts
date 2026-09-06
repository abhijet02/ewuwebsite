import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateProcurementInput,
  UpdateProcurementInput,
} from './dto/procurement.input';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { Procurement, ProcurementNewsPaperDetails } from './entities/procurement.entity';

@Injectable()
export class ProcurementService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'procurement', 'files');

  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(createInput: CreateProcurementInput, userId: number) {
    let fileUrl = null;

    if (createInput?.fileUrl) {
      const upload: any = await createInput.fileUrl;
      const fileName = `${Date.now()}_${upload.filename}`;
      fileUrl = await uploadFileStream(
        upload.createReadStream,
        this.uploadDir,
        fileName,
      );
    }

    return await this.prisma.procurement.create({
      data: {
        ...createInput,
        procurementNewsPaperDetails: { create: createInput?.procurementNewsPaperDetails },
        fileUrl,
        createdBy: userId,
        
      },
      include: { procurementNewsPaperDetails: true },
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return await this.prisma.procurement.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { procurementNewsPaperDetails: true}
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.procurement.findUnique({ 
      where: { id },
      include: { procurementNewsPaperDetails: true}
    });
    if (!record) {
      throw new NotFoundException(`Procurement with ID ${id} not found`);
    }
    return record;
  }

  async update(
    id: number,
    updateInput: UpdateProcurementInput,
    userId: number,
  ) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Error Updating: Id ${id} not found`);
    }

    const updateData = {
      ...updateInput,
      fileUrl: existing.fileUrl,
    };

    if (updateInput?.fileUrl) {
      // delete old file if exists
      if (existing.fileUrl) {
        const prevFilePath = existing.fileUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevFilePath);
      }

      const upload: any = await updateInput.fileUrl;
      const fileName = `${Date.now()}_${upload.filename}`;
      const filePath = await uploadFileStream(
        upload.createReadStream,
        this.uploadDir,
        fileName,
      );
      updateData.fileUrl = filePath;
    }

    return await this.prisma.procurement.update({
      where: { id },
      data: {
        ...updateData,
        procurementNewsPaperDetails: { deleteMany: {}, create: updateInput?.procurementNewsPaperDetails },
        updatedBy: userId,
      },
      include: { procurementNewsPaperDetails: true },
    });
  }

  async remove(id: number) {
    try {
      const record: Procurement = await this.findOne(id);
      if (record) {
        await this.prisma.procurement.delete({ where: { id } });
        if (record.fileUrl) {
          const prevFilePath = record.fileUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevFilePath);
        }
        return record;
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Procurement: ${e}`, 500);
    }
  }
}
