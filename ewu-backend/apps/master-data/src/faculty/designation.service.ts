import { HttpException, Injectable, Logger } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';

import { CreateDesignation, UpdateDesignation } from './dto/designation.input';
import { Designation } from './entities/designation.entity';

@Injectable()
export class DesignationService {
  private logger = new Logger('QuoteService');

  constructor(private prismaService: PrismaMasterDataService) {}

  async createDesignation(
    createDesignation: CreateDesignation,
    userId: number,
  ): Promise<Designation> {
    try {
      const newDesignationData = await this.prismaService.designation.create({
        data: {
          designation: createDesignation.designation,
          createdBy: userId,
          updatedBy: userId,
        },
      });

      return newDesignationData;
    } catch (e) {
      throw new HttpException(`Error creating menu: ${e}`, 500);
    }
  }

  // ✅ Get all designations
  async getAllDesignations(
    page: number,
    limit: number,
  ): Promise<Designation[]> {
    return this.prismaService.designation.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // ✅ Get a single designation by ID
  async getDesignationById(id: number): Promise<Designation | null> {
    return this.prismaService.designation.findUnique({
      where: { id },
    });
  }

  // ✅ Update a designation by ID
  async updateDesignation(
    id: number,
    updateDesignationInput: UpdateDesignation,
    userId: number,
  ): Promise<Designation> {
    return this.prismaService.designation.update({
      where: { id },
      data: {
        ...updateDesignationInput,
        updatedBy: userId,
      },
    });
  }

  // ✅ Delete a designation by ID
  async deleteDesignation(id: number): Promise<Designation> {
    return this.prismaService.designation.delete({
      where: { id },
    });
  }
}
