import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { SuccessCard } from './entities/success-card.entity';
import {
  CreateSuccessCardInput,
  UpdateSuccessCardInput,
} from './dto/success-card.input';

@Injectable()
export class SuccessCardService {
  constructor(private prisma: PrismaPageBuilderService) {}

  async create(
    input: CreateSuccessCardInput,
    userId: number,
  ): Promise<SuccessCard> {
    return this.prisma.suucessCard.create({
      data: {
        ...input,
        createdBy: userId,
      },
    });
  }

  async findAll(page = 1, limit = 10): Promise<SuccessCard[]> {
    const skip = (page - 1) * limit;
    return this.prisma.suucessCard.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<SuccessCard> {
    const record = await this.prisma.suucessCard.findUnique({ where: { id } });
    if (!record)
      throw new NotFoundException(`SuccessCard with ID ${id} not found`);
    return record;
  }

  async update(
    id: number,
    input: UpdateSuccessCardInput,
    userId: number,
  ): Promise<SuccessCard> {
    await this.findOne(id); // ensure exists
    return this.prisma.suucessCard.update({
      data: { ...input, updatedBy: userId },
      where: { id },
    });
  }

  async remove(id: number): Promise<SuccessCard> {
    await this.findOne(id); // ensure exists
    return this.prisma.suucessCard.delete({ where: { id } });
  }
}
