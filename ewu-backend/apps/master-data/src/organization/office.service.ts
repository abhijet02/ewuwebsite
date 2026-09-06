import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreateOfficeInput, UpdateOfficeInput } from './dto/office.input';

@Injectable()
export class OfficeService {
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateOfficeInput, userId: number) {
    try {
      return await this.prisma.office.create({
        data: {
          ...input,
          createdBy: userId,
        },
      });
    } catch (e) {
      throw new HttpException(`Error Creating Office: ${e}`, 500);
    }
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.prisma.office.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const office = await this.prisma.office.findUnique({ where: { id } });

    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    return office;
  }

  async update(id: number, input: UpdateOfficeInput, userId: number) {
    const existing = await this.findOne(id);
    if (existing) {
      const updatdOfficeData = await this.prisma.office.update({
        where: { id },
        data: {
          ...input,
          updatedBy: userId,
        },
      });
      return updatdOfficeData;
    } else {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    const existing = await this.findOne(id);
    if (existing) {
      await this.prisma.office.delete({ where: { id } });
      return existing;
    } else {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
  }
}
