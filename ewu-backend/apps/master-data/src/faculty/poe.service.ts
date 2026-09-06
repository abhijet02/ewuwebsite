import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreatePoeInput, UpdatePoeInput } from './dto/poe.input';
import { Poe } from './entities/poe.entity';

@Injectable()
export class PoeService {
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(createPoeInput: CreatePoeInput, userId: number) {
    return this.prisma.poe.create({
      data: {
        ...createPoeInput,
        createdBy: userId
      },
    });
  }

  async findAll(page = 1, limit = 20): Promise<Poe[]> {
    const skip = (page - 1) * limit; // Calculate how many records to skip

    return this.prisma.poe.findMany({
      skip,
      take: limit, // Number of records to return
      orderBy: { createdAt: 'desc' },
    });
  }

  //   async findAll() {
  //     return this.prisma.poe.findMany({
  //       orderBy: { id: 'desc' },
  //     });
  //   }

  async findByDepartment(departmentId: number) {
    const poe = await this.prisma.poe.findMany({ where: { departmentId } });
    if (!poe)
      throw new NotFoundException(
        `Poe with departmentId ${departmentId} not found`,
      );
    return poe;
  }

  async findOne(id: number) {
    const poe = await this.prisma.poe.findUnique({ where: { id } });
    if (!poe) throw new NotFoundException(`Poe with ID ${id} not found`);
    return poe;
  }

  async update(id: number, updatePoeInput: UpdatePoeInput, userId: number) {
    return this.prisma.poe.update({
      where: { id },
      data: {
        ...updatePoeInput,
        updatedBy: userId
      },
    });
  }

  async remove(id: number) {
    return this.prisma.poe.delete({ where: { id } });
  }
}
