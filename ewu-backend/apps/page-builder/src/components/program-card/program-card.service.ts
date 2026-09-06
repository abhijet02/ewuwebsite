import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { ProgramCard } from './entities/program-card.entity';
import {
  CreateProgramCardInput,
  UpdateProgramCardInput,
} from './dto/program-card.input';

@Injectable()
export class ProgramCardService {
  constructor(private prisma: PrismaPageBuilderService) {}

  async create(
    input: CreateProgramCardInput,
    userId: number,
  ): Promise<ProgramCard> {
    return this.prisma.programCard.create({
      data: { ...input, createdBy: userId },
    });
  }

  async findAll(page = 1, limit = 10): Promise<ProgramCard[]> {
    const skip = (page - 1) * limit;
    return this.prisma.programCard.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<ProgramCard> {
    const card = await this.prisma.programCard.findUnique({ where: { id } });
    if (!card)
      throw new NotFoundException(`ProgramCard with ID ${id} not found`);
    return card;
  }

  async update(
    id: number,
    input: UpdateProgramCardInput,
    userId: number,
  ): Promise<ProgramCard> {
    await this.findOne(id);
    return this.prisma.programCard.update({
      where: { id },
      data: { ...input, updatedBy: userId },
    });
  }

  async remove(id: number): Promise<ProgramCard> {
    await this.findOne(id);
    return this.prisma.programCard.delete({ where: { id } });
  }
}
