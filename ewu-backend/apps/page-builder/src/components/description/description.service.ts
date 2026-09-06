// src/description/descriptions.service.ts

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateDescriptionInput } from '../dto/description.input';
import { UpdateDescriptionInput } from '../dto/description.input';

@Injectable()
export class DescriptionsService {
  private logger = new Logger('DescriptionsService');

  constructor(
    @Inject(PrismaPageBuilderService)
    private readonly prismaService: PrismaPageBuilderService,
  ) {}

  async create(createDescriptionInput: CreateDescriptionInput, userId: number) {
    try {
      const response = await this.prismaService.description.create({
        data: {
          ...createDescriptionInput,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      this.logger.error(`Error creating description`, e);
      throw new HttpException(`Error creating description: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(page = 1, limit = 20) {
    try {
      return await this.prismaService.description.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      throw new HttpException(`Error fetching descriptions: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.description.findUnique({
        where: { id },
      });
    } catch (e) {
      throw new HttpException(`Error fetching description: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateDescriptionInput: UpdateDescriptionInput,userId: number) {
    const existing = await this.prismaService.description.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new HttpException('Description not found', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.prismaService.description.update({
        where: { id },
        data: {
          ...updateDescriptionInput,
          updatedBy: userId,
        },
      });
    } catch (e) {
      throw new HttpException(`Error updating description: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const existing = await this.prismaService.description.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new HttpException('Description not found', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.prismaService.description.delete({
        where: { id },
      });
      return existing;
    } catch (e) {
      throw new HttpException(`Error deleting description: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
