import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateCategory } from '../dto/create-category.input';
import { UpdateCategory } from '../dto/update-category.input';
@Injectable()
export class CategoryService {
  private logger = new Logger('Category service');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}
  async create(data: CreateCategory) {
    return this.prismaService.category.create({ data });
  }

  async findAll(page: number, limit: number) {
    return this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  async getCategoryByComponent(componentId: number){
    return this.prismaService.category.findMany({
      where: { componentId: componentId },
    });
  }

  async update(data: UpdateCategory) {
    const { id } = data;
    return this.prismaService.category.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
