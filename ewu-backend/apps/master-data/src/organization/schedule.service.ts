import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreateScheduleInput, UpdateScheduleInput } from './dto/schedule.input';

@Injectable()
export class ScheduleService {
  private logger = new Logger('ScheduleService');

  constructor(
    @Inject(PrismaMasterDataService)
    private readonly prismaService: PrismaMasterDataService,
  ) {}

  async create(createScheduleInput: CreateScheduleInput, userId: number) {
    try {
      const { day, officeMemberId } = createScheduleInput;

      const existing = await this.prismaService.schedule.findMany({
        where: {
          day,
          officeMemberId,
        },
      });

      if (existing.length) {
        this.logger.warn(
          'Schedule already exists for the given day and office member',
        );
        throw new HttpException(
          'Schedule already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const schedule = await this.prismaService.schedule.create({
        data: {
          ...createScheduleInput,
          createdBy: userId,
        },
      });

      return schedule;
    } catch (error) {
      this.logger.error(`Error creating schedule: ${error.message}`);
      throw new HttpException(
        `Error creating schedule: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page = 1, limit = 20) {
    try {
      return await this.prismaService.schedule.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(`Error fetching schedules: ${error.message}`);
      throw new HttpException(
        `Error fetching schedules`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.schedule.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Error fetching schedule with ID ${id}: ${error.message}`,
      );
      throw new HttpException(
        `Error fetching schedule`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateScheduleInput: UpdateScheduleInput,
    userId: number,
  ) {
    try {
      const existing = await this.prismaService.schedule.findUnique({
        where: { id },
      });

      if (!existing) {
        this.logger.warn(`Schedule with ID ${id} not found`);
        throw new HttpException('Schedule not found', HttpStatus.BAD_REQUEST);
      }

      const updated = await this.prismaService.schedule.update({
        where: { id },
        data: {
          ...updateScheduleInput,
          updatedBy: userId,
          updatedAt: new Date(),
        },
      });

      return updated;
    } catch (error) {
      this.logger.error(`Error updating schedule: ${error.message}`);
      throw new HttpException(
        `Error updating schedule`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prismaService.schedule.findUnique({
        where: { id },
      });

      if (!existing) {
        this.logger.warn(`Schedule with ID ${id} not found`);
        throw new HttpException('Schedule not found', HttpStatus.BAD_REQUEST);
      }

      await this.prismaService.schedule.delete({
        where: { id },
      });

      return existing;
    } catch (error) {
      this.logger.error(`Error deleting schedule: ${error.message}`);
      throw new HttpException(
        `Error deleting schedule`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
