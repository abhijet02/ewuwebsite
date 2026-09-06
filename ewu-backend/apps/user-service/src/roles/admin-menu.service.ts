import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateAdminMenuInput } from './dto/create-admin-menu.input';
import { UpdateAdminMenuInput } from './dto/update-admin-menu.input';
import { PrismaUserService } from '../../../../prisma/prisma-user.service';
import { AdminMenu } from './entities/admin-menu.entity';

@Injectable()
export class AdminMenusService {
  private logger = new Logger('Admin Menu Service');

  constructor(
    @Inject(PrismaUserService)
    private prismaService: PrismaUserService,
  ) {}

  async create(createAdminMenuInput: CreateAdminMenuInput): Promise<AdminMenu> {
    try {
      const { name } = createAdminMenuInput;
      const isMenuExist = await this.prismaService.adminMenu.findMany({
        where: { name },
      });

      this.logger.log(`isMenuExist ${isMenuExist.length}`);
      if (isMenuExist.length) {
        throw new HttpException('Menu already exists', HttpStatus.BAD_REQUEST);
      }

      const response = await this.prismaService.adminMenu.create({
        data: createAdminMenuInput,
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating menu: ${e}`, 500);
    }
  }

  async findAll(page: number, limit: number = 20): Promise<AdminMenu[]> {
    return this.prismaService.adminMenu.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<AdminMenu> {
    return this.prismaService.adminMenu.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateAdminMenuInput: UpdateAdminMenuInput,
  ): Promise<AdminMenu> {
    const isMenuExist = await this.prismaService.adminMenu.findUnique({
      where: { id },
    });

    if (isMenuExist) {
      const updatedMenu = await this.prismaService.adminMenu.update({
        data: updateAdminMenuInput,
        where: { id },
      });
      return updatedMenu;
    } else {
      throw new HttpException('Menu not found', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<AdminMenu> {
    try {
      const isMenuExist = await this.prismaService.adminMenu.findUnique({
        where: { id },
      });

      if (isMenuExist) {
        await this.prismaService.adminMenu.delete({
          where: { id },
        });
        return isMenuExist;
      } else {
        throw new HttpException('Menu not found', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error deleting menu: ${e}`, 500);
    }
  }
}
