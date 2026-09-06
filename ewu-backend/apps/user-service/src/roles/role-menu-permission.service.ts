import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateRoleMenuPermissionInput } from './dto/create-role-menu-permission.input';
import { PrismaUserService } from '../../../../prisma/prisma-user.service';
import { RoleMenuPermission } from './entities/role-menu-permission.entity';
import { UpdateRoleMenuPermissionInput } from './dto/update-role-menu-permission';

@Injectable()
export class RoleMenuPermissionsService {
  private logger = new Logger('Role Menu Permission Service');

  constructor(
    @Inject(PrismaUserService)
    private prismaService: PrismaUserService,
  ) {}

  async create(
    createRoleMenuPermissionInput: CreateRoleMenuPermissionInput,
  ): Promise<RoleMenuPermission> {
    try {
      const { roleId, menuId } = createRoleMenuPermissionInput;

      const isPermissionExist =
        await this.prismaService.roleMenuPermission.findMany({
          where: { roleId, menuId },
        });

      this.logger.log(`isPermissionExist ${isPermissionExist.length}`);
      if (isPermissionExist.length) {
        throw new HttpException(
          'Permission already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const response = await this.prismaService.roleMenuPermission.create({
        data: createRoleMenuPermissionInput,
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating permission: ${e}`, 500);
    }
  }

  async findAll(
    page: number,
    limit: number = 20,
  ): Promise<RoleMenuPermission[]> {
    return this.prismaService.roleMenuPermission.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<RoleMenuPermission> {
    return this.prismaService.roleMenuPermission.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateRoleMenuPermissionInput: UpdateRoleMenuPermissionInput,
  ): Promise<RoleMenuPermission> {
    const isPermissionExist =
      await this.prismaService.roleMenuPermission.findUnique({
        where: { id },
      });

    if (isPermissionExist) {
      const updatedPermission =
        await this.prismaService.roleMenuPermission.update({
          data: updateRoleMenuPermissionInput,
          where: { id },
        });
      return updatedPermission;
    } else {
      throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<RoleMenuPermission> {
    try {
      const isPermissionExist =
        await this.prismaService.roleMenuPermission.findUnique({
          where: { id },
        });

      if (isPermissionExist) {
        await this.prismaService.roleMenuPermission.delete({
          where: { id },
        });
        return isPermissionExist;
      } else {
        throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error deleting permission: ${e}`, 500);
    }
  }
}
