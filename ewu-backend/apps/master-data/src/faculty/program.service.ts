import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';

import { CreateProgramInput, UpdateProgramInput } from './dto/program-input';
import { Program } from './entities/program.entity';

@Injectable()
export class ProgramService {
  private logger = new Logger('Program Service');

  constructor(private prismaService: PrismaMasterDataService) {}

  // ✅ Create a new program
  async createProgram(
    createProgramInput: CreateProgramInput,
    userId: number,
  ): Promise<Program> {
    try {
      const newProgram = await this.prismaService.program.create({
        data: {
          ...createProgramInput,
          createdBy: userId,
          updatedBy: userId,
        },
      });
      return newProgram;
    } catch (error) {
      this.logger.error(`Error creating program: ${error}`);
      throw new HttpException(`Error creating program: ${error}`, 500);
    }
  }

  // ✅ Get all programs with pagination
  async getAllPrograms(page: number = 1, limit: number): Promise<Program[]> {
    return this.prismaService.program.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { order: 'asc' },
      include: {
        programCategory: true,
        department: true,
        course: true,
      },
    });
  }

  // ✅ Get a single program by ID
  async getProgramById(id: number): Promise<Program> {
    try {
      return this.prismaService.program.findUnique({
        where: { id },
        include: {
          programCategory: true,
          department: true,
          course: true,
        },
      });
    } catch (error) {
      this.logger.error(`Error getting program with this id: ${error}`);
      throw new HttpException(
        `Error getting program with this id: ${error}`,
        500,
      );
    }
  }

  // ✅ Update a program by ID
  async updateProgram(
    id: number,
    updateProgramInput: UpdateProgramInput,
    userId: number,
  ): Promise<Program> {
    try {
      const isProgramExist = await this.getProgramById(id);
      if (isProgramExist) {
        return await this.prismaService.program.update({
          where: { id },
          data: {
            ...updateProgramInput,
            updatedBy: userId,
          },
        });
      } else {
        throw new HttpException(
          `Program  Id not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.error(`Error updating program: ${error}`);
      throw new HttpException(`Error updating program: ${error}`, 500);
    }
  }

  // ✅ Delete a program by ID
  async deleteProgram(id: number): Promise<Program> {
    try {
      const isProgramExist = await this.getProgramById(id);
      if (isProgramExist) {
        return await this.prismaService.program.delete({
          where: { id },
        });
      } else {
        throw new HttpException(
          `Program  Id not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.error(`Error deleting program: ${error}`);
      throw new HttpException(`Error deleting program: ${error}`, 500);
    }
  }
}
