import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreatePageInput } from './dto/create-page.input';
import { UpdatePageInput } from './dto/update-page.input';
import { PrismaPageBuilderService } from '../../../../prisma/prisma-page-builder.service';

@Injectable()
export class PagesService {
  private logger = new Logger('Page  service');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(createPageInput: CreatePageInput) {
    try {
      const { label } = createPageInput;
      const isPageExist = await this.prismaService.pages.findMany({
        where: {
          label,
        },
      });
      this.logger.log(`isPageExist ${isPageExist.length}`);
      if (isPageExist.length) {
        this.logger.log('Pages create: pages exist');
        throw new HttpException('pages already exist', HttpStatus.BAD_REQUEST);
      }
      const response = await this.prismaService.pages.create({
        data: {
          ...createPageInput,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating page: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20) {
    return await this.prismaService.pages.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.pages.findUnique({
      where: {
        id,
      },
    });
  }

  async findByLink(link: string) {
    return await this.prismaService.pages.findMany({
      where:{
        link
      }
    });
  }

  async update(id: number, updatePageInput: UpdatePageInput) {
    const isPageExist = await this.prismaService.pages.findUnique({
      where: {
        id,
      },
    });
    if (isPageExist) {
      const updatedMenuItem = await this.prismaService.pages.update({
        data: {
          ...updatePageInput,
        },
        where: {
          id,
        },
      });
      return updatedMenuItem;
    } else {
      throw new HttpException('Menu not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isPageExist = await this.prismaService.pages.findUnique({
        where: {
          id,
        },
      });
      if (isPageExist) {
        await this.prismaService.pages.delete({
          where: {
            id,
          },
        });
        return isPageExist;
      } else {
        throw new HttpException('Page not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting page: ${e}`, 500);
    }
  }
}
