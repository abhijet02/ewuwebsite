import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreatefacultyInput } from './dto/create-faculty.input';
import { UpdateFacultyInput } from './dto/update-faculty.input';

@Injectable()
export class FacultyService {
  private logger = new Logger('faculty  service');

  constructor(
    @Inject(PrismaMasterDataService)
    private prismaService: PrismaMasterDataService,
  ) {}

  async create(createfacultyInput: CreatefacultyInput, userId: number) {
    try {
      const { name } = createfacultyInput;
      const isFacultyExist = await this.prismaService.faculty.findMany({
        where: {
          name,
        },
      });
      this.logger.log(`isFacultyExist ${isFacultyExist.length}`);
      if (isFacultyExist.length) {
        this.logger.log('Faculty create: faculty exist');
        throw new HttpException(
          'Faculty already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await this.prismaService.faculty.create({
        data: {
          ...createfacultyInput,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating faculty: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20) {
    return await this.prismaService.faculty.findMany({ take: limit });
  }

  async findOne(id: number) {
    return await this.prismaService.faculty.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateFacultyInput: UpdateFacultyInput,
    userId: number,
  ) {
    const isFacultyExist = await this.prismaService.faculty.findUnique({
      where: {
        id,
      },
    });
    if (isFacultyExist) {
      const updatedFaculty = await this.prismaService.faculty.update({
        data: {
          ...updateFacultyInput,
          updatedBy: userId
        },
        where: {
          id,
        },
      });
      return updatedFaculty;
    } else {
      throw new HttpException('Faculty not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isFacultyExist = await this.prismaService.faculty.findUnique({
        where: {
          id,
        },
      });
      if (isFacultyExist) {
        await this.prismaService.faculty.delete({
          where: {
            id,
          },
        });
        return isFacultyExist;
      } else {
        throw new HttpException('Faculty not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting faculty: ${e}`, 500);
    }
  }
}
