import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PrismaUserService } from '../../../../prisma/prisma-user.service';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private logger = new Logger('Role creation  service');

  constructor(
    @Inject(PrismaUserService)
    private prismaService: PrismaUserService,
  ) {}

  async create(createRoleInput: CreateRoleInput, userId): Promise<Role> {
    try {
      const { name } = createRoleInput;
      const isRoleExist = await this.prismaService.role.findMany({
        where: {
          name,
        },
      });
      this.logger.log(`isRoleExist ${isRoleExist.length}`);
      if (isRoleExist.length) {
        this.logger.log('Role create: Rolw exist');
        throw new HttpException('Role already exist', HttpStatus.BAD_REQUEST);
      }
      const response = await this.prismaService.role.create({
        data: {
          ...createRoleInput,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating role: ${e}`, 500);
    }
  }

  async findAll(page: number, limit: number = 20): Promise<Role[]> {
    return this.prismaService.role.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Role> {
    return await this.prismaService.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateRoleInput: UpdateRoleInput,
    userId: number,
  ): Promise<Role> {
    const isRoleExist = await this.prismaService.role.findUnique({
      where: {
        id,
      },
    });
    if (isRoleExist) {
      const updatedRoleItem = await this.prismaService.role.update({
        data: {
          ...updateRoleInput,
          updatedBy: userId
        },
        where: {
          id,
        },
      });
      return updatedRoleItem;
    } else {
      throw new HttpException('Role not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<Role> {
    try {
      const isRoleExist = await this.prismaService.role.findUnique({
        where: {
          id,
        },
      });
      if (isRoleExist) {
        await this.prismaService.role.delete({
          where: {
            id,
          },
        });
        return isRoleExist;
      } else {
        throw new HttpException('Role  not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting role: ${e}`, 500);
    }
  }
}
