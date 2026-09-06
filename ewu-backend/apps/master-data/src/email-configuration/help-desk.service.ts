import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateHelpDeskInput,
  UpdateHelpDeskInput,
} from './dto/help-desk.input';

@Injectable()
export class HelpDeskService {
  private logger = new Logger('HelpDesk Service');

  constructor(
    @Inject(PrismaMasterDataService)
    private prismaService: PrismaMasterDataService,
  ) {}

  async create(createHelpDeskInput: CreateHelpDeskInput, userId: number) {
    try {
      const response = await this.prismaService.helpDesk.create({
        data: {
          ...createHelpDeskInput,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating help desk: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20) {
    return await this.prismaService.helpDesk.findMany({ take: limit });
  }

  async findOne(id: number) {
    return await this.prismaService.helpDesk.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateHelpDeskInput: UpdateHelpDeskInput,
    userId: number,
  ) {
    try {
      const isHelpdeskExist = await this.findOne(id);
      if (isHelpdeskExist) {
        await this.prismaService.helpDesk.update({
          data: {
            ...updateHelpDeskInput,
            updatedBy: userId,
          },
          where: {
            id,
          },
        });
        return isHelpdeskExist;
      } else {
        throw new HttpException('Help Desk not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Help desk: ${e}`, 500);
    }
  }

  async remove(id: number) {
    try {
      const isHelpdeskExist = await this.findOne(id);
      if (isHelpdeskExist) {
        await this.prismaService.helpDesk.delete({
          where: {
            id,
          },
        });
        return isHelpdeskExist;
      } else {
        throw new HttpException('Help Desk not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Help desk: ${e}`, 500);
    }
  }
}
