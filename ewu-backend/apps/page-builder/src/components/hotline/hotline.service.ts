import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { Hotline } from './entities/hotline.entity';
import { CreateHotlineInput, UpdateHotlineInput } from './dto/hotline.input';

@Injectable()
export class HotlineService {
  constructor(private prisma: PrismaPageBuilderService) {}

  async create(input: CreateHotlineInput, userId: number): Promise<Hotline> {
    return this.prisma.hotline.create({
      data: { ...input, createdBy: userId },
    });
  }

  async findAll(page = 1, limit = 10): Promise<Hotline[]> {
    const skip = (page - 1) * limit;
    return this.prisma.hotline.findMany({
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number): Promise<Hotline> {
    const item = await this.prisma.hotline.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Hotline with ID ${id} not found`);
    return item;
  }

  async update(
    id: number,
    input: UpdateHotlineInput,
    userId: number,
  ): Promise<Hotline> {
    await this.findOne(id);
    return this.prisma.hotline.update({
      where: { id },
      data: { ...input, updatedBy: userId },
    });
  }

  async remove(id: number): Promise<Hotline> {
    await this.findOne(id);
    return this.prisma.hotline.delete({ where: { id } });
  }
}
