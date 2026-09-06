import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreateSemesterInput, UpdateSemesterInput } from './dto/semester.input';

@Injectable()
export class SemesterService {
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateSemesterInput, userId: number) {
    return await this.prisma.semester.create({
      data: {
        ...input,
        createdBy: userId,
      },
    });
  }

  async findAll(page=1, limit) {
    return await this.prisma.semester.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const semester = await this.prisma.semester.findUnique({ where: { id } });
    if (!semester) {
      throw new NotFoundException(`Semester with ID ${id} not found`);
    }
    return semester;
  }

  async update(id: number, input: UpdateSemesterInput, userId: number) {
    const existing = await this.prisma.semester.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Semester with ID ${id} not found`);
    }

    return await this.prisma.semester.update({
      where: { id },
      data: {
        ...input,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number) {
    try {
      const semester = await this.findOne(id);
      await this.prisma.semester.delete({ where: { id } });
      return semester;
    } catch (error) {
      throw new HttpException(`Error Deleting Semester: ${error}`, 500);
    }
  }
}
