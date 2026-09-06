import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { PrismaPageBuilderService } from '../../../../prisma/prisma-page-builder.service';
import {
  deleteFileAndDirectory,
  getFileUploadPath,
} from 'utils/file-upload.util';
import { join } from 'path';

@Injectable()
export class MenusService {
  private logger = new Logger('Menu  service');
  private uploadDir = join(process.env.UPLOAD_DIR, `menu`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(createMenuInput: CreateMenuInput) {
    try {
      const response = await this.prismaService.menus.create({
        data: {
          ...createMenuInput,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating menu: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20) {
    return await this.prismaService.menus.findMany();
  }

  async findAllByPagination(page = 1, limit = 20) {
    // Calculate how many records to skip
    const skip = (page - 1) * limit;

    // Fetch paginated results
    const data = await this.prismaService.menus.findMany({
      skip,
      take: limit,
    });

    // Optionally, you may want to return total count for pagination info
    const total = await this.prismaService.menus.count();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

   async findAllMenusWithPageIdZero(page, limit = 20) {
    return await this.prismaService.menus.findMany({ 
      where: {
        pageId: 0, // Assuming you want to find menus without a specific pageId
      },
    });
  }

  async findAllMenusWithSamePageId(pageId, page, limit = 20) {
    return await this.prismaService.menus.findMany({ 
      where: {
        pageId, // Assuming you want to find menus without a specific pageId
      },
    });
  }


  async findOne(id: number) {
    return await this.prismaService.menus.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMenuInput: UpdateMenuInput) {
    const isMenuExist = await this.prismaService.menus.findUnique({
      where: {
        id,
      },
    });
    if (isMenuExist) {
      const updatedMenuItem = await this.prismaService.menus.update({
        data: {
          ...updateMenuInput,
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
      const isMenuExist = await this.prismaService.menus.findUnique({
        where: {
          id,
        },
      });
      if (isMenuExist) {
        await this.prismaService.menus.delete({
          where: {
            id,
          },
        });
        return isMenuExist;
      } else {
        throw new HttpException('Menu Item not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting menu Item: ${e}`, 500);
    }
  }
}
