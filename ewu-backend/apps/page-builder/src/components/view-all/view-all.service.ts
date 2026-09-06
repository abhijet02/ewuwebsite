import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateViewAllInput, UpdateViewAllInput } from './dto/view-all.input';

@Injectable()
export class ViewAllService {
  constructor(private prisma: PrismaPageBuilderService) {}

  async create(createViewAllInput: CreateViewAllInput, userId: number) {
    
    return await this.prisma.viewAll.create({
      data: {
        ...createViewAllInput,
        createdBy: userId,
      },
    });
  }

  async findAll(page = 1,limit = 20, pageId,componentId ) {
    
    const skip = (page - 1) * limit;
      const whereCondition = pageId ? { pageId } : {};
    
    if (componentId) {
      whereCondition['componentId'] = componentId;
    }
    
    if (pageId) {
      whereCondition['pageId'] = pageId;
    }

    return await this.prisma.viewAll.findMany({
      where: whereCondition,
      take: limit,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const viewAll = await this.prisma.viewAll.findUnique({
      where: { id },
    });

    if (!viewAll) {
      throw new NotFoundException(`ViewAll with ID ${id} not found`);
    }

    return viewAll;
  }

  async findByComponentId(componentId: number) {
    return await this.prisma.viewAll.findMany({
      where: { componentId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByPageId(pageId: number) {
    return await this.prisma.viewAll.findMany({
      where: { pageId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: number, updateViewAllInput: UpdateViewAllInput, userId: number) {

    // Check if exists
    await this.findOne(id);

    return await this.prisma.viewAll.update({
      where: { id },
      data: {
        ...updateViewAllInput,
        updatedBy: userId,
        updateAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    // Check if exists
    await this.findOne(id);

    await this.prisma.viewAll.delete({
      where: { id },
    });

    return true;
  }
}