import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { ProgramCalender } from './entities/program-calender.entity';
import { CreateProgramCalenderInput } from './dto/create-program-calender.input';
import { UpdateProgramCalenderInput } from './dto/update-program-calender.input';

@Injectable()
export class ProgramCalenderService {
  private logger = new Logger('Program Calender  service');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(
    createProgramCalenderInput: CreateProgramCalenderInput,
    userId: number,
  ): Promise<ProgramCalender> {
    try {
      const createProgramCalenderdata =
        this.prismaService.programCalender.create({
          data: {
            ...createProgramCalenderInput,
            createdBy: userId,
          },
        });

      this.logger.log(`Program Calender date: ${createProgramCalenderdata}`);
      return createProgramCalenderdata;
    } catch (e) {
      throw new HttpException(`Error Creating program Calender: ${e}`, 500);
    }
  }

  async findAll(page, limit): Promise<ProgramCalender[]> {
    return this.prismaService.programCalender.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<ProgramCalender> {
    const programCalender: ProgramCalender =
      await this.prismaService.programCalender.findUnique({
        where: { id },
      });
    if (!programCalender)
      throw new NotFoundException(` program Calender with ID ${id} not found`);
    return programCalender;
  }

  async update(
    id: number,
    updateProgramCalenderInput: UpdateProgramCalenderInput,
    userId: number,
  ): Promise<ProgramCalender> {
    try {
      const isProgramCalenderExist: ProgramCalender = await this.findOne(id);
      if (isProgramCalenderExist) {
        const updatedProgramCalenderData =
          await this.prismaService.programCalender.update({
            data: {
              ...updateProgramCalenderInput,
              updatedBy: userId,
            },
            where: {
              id,
            },
          });
        return updatedProgramCalenderData;
      } else {
        throw new HttpException(
          'Program Calender not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Updating Program Calender : ${e}`, 500);
    }
  }

  async remove(id: number): Promise<ProgramCalender> {
    try {
      const isProgramCalenderExist: ProgramCalender = await this.findOne(id); // Ensure the notice exists
      if (isProgramCalenderExist) {
        await this.prismaService.programCalender.delete({ where: { id } });
      }
      return isProgramCalenderExist;
    } catch (e) {
      throw new HttpException(`Error Updating program Calender: ${e}`, 500);
    }
  }
}
