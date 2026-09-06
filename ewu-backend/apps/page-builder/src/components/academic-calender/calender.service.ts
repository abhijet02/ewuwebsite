import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateCalenderInput } from './dto/create-calender.input';
import { Calender } from './entities/calender.entity';
import { UpdateCalenderInput } from './dto/update-calender.input';

@Injectable()
export class CalenderService {
  private logger = new Logger('Calender  service');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(
    createCalenderInput: CreateCalenderInput,
    userId: number,
  ): Promise<Calender> {
    try {
      const createdCalenderData = this.prismaService.calender.create({
        data: {
          ...createCalenderInput,
          createdBy: userId,
        },
      });

      this.logger.log(`Calender date: ${createdCalenderData}`);
      return createdCalenderData;
    } catch (e) {
      throw new HttpException(`Error Creating Calender: ${e}`, 500);
    }
  }

  async findAll(page, limit): Promise<Calender[]> {
    return this.prismaService.calender.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Calender> {
    const calender: Calender = await this.prismaService.calender.findUnique({
      where: { id },
    });
    if (!calender)
      throw new NotFoundException(`calender with ID ${id} not found`);
    return calender;
  }

  async update(
    id: number,
    updateCalenderInput: UpdateCalenderInput,
    userId: number,
  ): Promise<Calender> {
    try {
      const isCalenderExist: Calender = await this.findOne(id);
      if (isCalenderExist) {
        const updatedCalenderData = await this.prismaService.calender.update({
          data: {
            ...updateCalenderInput,
            updatedBy: userId,
          },
          where: {
            id,
          },
        });
        return updatedCalenderData;
      } else {
        throw new HttpException('Calender not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Calender: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<Calender> {
    try {
      const isCalenderExist: Calender = await this.findOne(id); // Ensure the notice exists
      if (isCalenderExist) {
        await this.prismaService.calender.delete({ where: { id } });
      }
      return isCalenderExist;
    } catch (e) {
      throw new HttpException(`Error Updating calender: ${e}`, 500);
    }
  }
}
