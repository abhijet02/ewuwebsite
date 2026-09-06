import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { FollowUs } from './entities/follow-us.entity';
import {
  CreateFollowUsInput,
  UpdateFollowUsInput,
} from './dto/follow-us.input';

@Injectable()
export class FollowUsService {
  constructor(private prisma: PrismaPageBuilderService) {}

  async create(input: CreateFollowUsInput, userId: number): Promise<FollowUs> {
    return this.prisma.followUs.create({
      data: { ...input, createdBy: userId },
    });
  }

  async findAll(page = 1, limit = 10): Promise<FollowUs[]> {
    const skip = (page - 1) * limit;
    return this.prisma.followUs.findMany({
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number): Promise<FollowUs> {
    const item = await this.prisma.followUs.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`FollowUs with ID ${id} not found`);
    return item;
  }

  async update(
    id: number,
    input: UpdateFollowUsInput,
    userId: number,
  ): Promise<FollowUs> {
    await this.findOne(id);
    return this.prisma.followUs.update({
      where: { id },
      data: { ...input, updatedBy: userId },
    });
  }

  async remove(id: number): Promise<FollowUs> {
    await this.findOne(id);
    return this.prisma.followUs.delete({ where: { id } });
  }
}
