import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { SearchCourseCard } from './entities/search-course-card.entity';
import {
  CreateSearchCourseCardInput,
  UpdateSearchCourseCardInput,
} from './dto/searh-course-card.input';

@Injectable()
export class SearchCourseCardService {
  constructor(private prisma: PrismaPageBuilderService) {}

  async create(
    input: CreateSearchCourseCardInput,
    userId: number,
  ): Promise<SearchCourseCard> {
    return this.prisma.searchCourseCard.create({
      data: { ...input, createdBy: userId },
    });
  }

  async findAll(page = 1, limit = 10): Promise<SearchCourseCard[]> {
    const skip = (page - 1) * limit;
    return this.prisma.searchCourseCard.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<SearchCourseCard> {
    const card = await this.prisma.searchCourseCard.findUnique({
      where: { id },
    });
    if (!card)
      throw new NotFoundException(`SearchCourseCard with ID ${id} not found`);
    return card;
  }

  async update(
    id: number,
    input: UpdateSearchCourseCardInput,
    userId: number,
  ): Promise<SearchCourseCard> {
    await this.findOne(id);
    return this.prisma.searchCourseCard.update({
      where: { id },
      data: { ...input, updatedBy: userId },
    });
  }

  async remove(id: number): Promise<SearchCourseCard> {
    await this.findOne(id);
    return this.prisma.searchCourseCard.delete({ where: { id } });
  }
}
