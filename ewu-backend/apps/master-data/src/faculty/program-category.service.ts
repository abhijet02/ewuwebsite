import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';

import {
  CreateProgramCategoryInput,
  UpdateProgramCategoryInput,
} from './dto/program-category.input';
import { ProgramCategory } from './entities/program-category.entity';

@Injectable()
export class ProgramCategoryService {
  private logger = new Logger('Program Category Service');

  constructor(private prismaService: PrismaMasterDataService) {}

  // ✅ Create a new program category
  async createProgramCategory(
    createProgramCategoryInput: CreateProgramCategoryInput,
    userId: number,
  ): Promise<ProgramCategory> {
    try {
      const newProgramCategory =
        await this.prismaService.programCategory.create({
          data: {
            ...createProgramCategoryInput,
            createdBy: userId,
            updatedBy: userId,
          },
        });
      return newProgramCategory;
    } catch (error) {
      this.logger.error(`Error creating program category: ${error}`);
      throw new HttpException(`Error creating program category: ${error}`, 500);
    }
  }

  // ✅ Get all program categories with pagination
  async getAllProgramCategories(
    page: number = 1,
    limit: number,
  ): Promise<ProgramCategory[]> {
    return this.prismaService.programCategory.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { order: 'asc' },
    });
  }

  // ✅ Get a single program category by ID
  async getProgramCategoryById(id: number): Promise<ProgramCategory> {
    return this.prismaService.programCategory.findUnique({
      where: { id },
    });
  }

  // ✅ Update a program category by ID
  async updateProgramCategory(
    id: number,
    updateProgramCategoryInput: UpdateProgramCategoryInput,
    userId: number,
  ): Promise<ProgramCategory> {
    try {
      const isProgramCategoryExist = await this.getProgramCategoryById(id);
      if (isProgramCategoryExist) {
        return await this.prismaService.programCategory.update({
          where: { id },
          data: {
            ...updateProgramCategoryInput,
            updatedBy: userId,
          },
        });
      } else {
        throw new HttpException(
          `Program category Id not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.error(`Error updating program category: ${error}`);
      throw new HttpException(`Error updating program category: ${error}`, 500);
    }
  }

  // ✅ Delete a program category by ID
  async deleteProgramCategory(id: number): Promise<ProgramCategory> {
    try {
      const isProgramCategoryExist = await this.getProgramCategoryById(id);
      if (isProgramCategoryExist) {
        return await this.prismaService.programCategory.delete({
          where: { id },
        });
      } else {
        throw new HttpException(
          `Program category Id not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.error(`Error deleting program category: ${error}`);
      throw new HttpException(`Error deleting program category: ${error}`, 500);
    }
  }
}
