import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBuilderInput } from './dto/create-builder.input';
import { UpdateBuilderInput } from './dto/update-builder.input';
import { PrismaPageBuilderService } from '../../../../prisma/prisma-page-builder.service';
import { Builder } from './entities/builder.entity';

@Injectable()
export class BuilderService {
  private logger = new Logger('Builder  service');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(
    createBuilderInput: CreateBuilderInput,
    userId: number,
  ): Promise<Builder> {
    try {
      const createdBuilderdata = this.prismaService.builder.create({
        data: {
          ...createBuilderInput,
          createdBy: userId,
        },
      });

      this.logger.log(`Builder date: ${createdBuilderdata}`);
      return createdBuilderdata;
    } catch (e) {
      throw new HttpException(`Error Creating builder: ${e}`, 500);
    }
  }

  async findAll(page, limit, pageId?: number): Promise<Builder[]> {
    const whereCondition = pageId ? {pageId: pageId}: {};
    return this.prismaService.builder.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Builder> {
    const slider = await this.prismaService.builder.findUnique({
      where: { id },
    });
    if (!slider) throw new NotFoundException(`builder with ID ${id} not found`);
    return slider;
  }

  async update(
    id: number,
    updateBuilderInput: UpdateBuilderInput,
    userId: number,
  ): Promise<Builder> {
    try {
      const isBuilderExist: Builder = await this.findOne(id);
      if (isBuilderExist) {
        const updatedBuilderData = await this.prismaService.builder.update({
          data: {
            ...updateBuilderInput,
            updatedBy: userId,
          },
          where: {
            id,
          },
        });
        return updatedBuilderData;
      } else {
        throw new HttpException('Builder not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Builder: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<Builder> {
    try {
      const isBuilderExist: Builder = await this.findOne(id); // Ensure the notice exists
      if (isBuilderExist) {
        await this.prismaService.builder.delete({ where: { id } });
      }
      return isBuilderExist;
    } catch (e) {
      throw new HttpException(`Error Updating builder: ${e}`, 500);
    }
  }
}
