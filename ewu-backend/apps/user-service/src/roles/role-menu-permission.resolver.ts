import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleMenuPermission } from './entities/role-menu-permission.entity';
import { CreateRoleMenuPermissionInput } from './dto/create-role-menu-permission.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { RoleMenuPermissionsService } from './role-menu-permission.service';
import { UpdateRoleMenuPermissionInput } from './dto/update-role-menu-permission';

@Resolver(() => RoleMenuPermission)
export class RoleMenuPermissionsResolver {
  constructor(
    private readonly roleMenuPermissionsService: RoleMenuPermissionsService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => RoleMenuPermission)
  createRoleMenuPermission(
    @Args('createRoleMenuPermissionInput')
    createRoleMenuPermissionInput: CreateRoleMenuPermissionInput,
  ) {
    return this.roleMenuPermissionsService.create(
      createRoleMenuPermissionInput,
    );
  }

  @UseGuards(AuthGuard)
  @Query(() => [RoleMenuPermission], { name: 'roleMenuPermissions' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.roleMenuPermissionsService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Query(() => RoleMenuPermission, { name: 'roleMenuPermission' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roleMenuPermissionsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RoleMenuPermission)
  updateRoleMenuPermission(
    @Args('updateRoleMenuPermissionInput')
    updateRoleMenuPermissionInput: UpdateRoleMenuPermissionInput,
  ) {
    return this.roleMenuPermissionsService.update(
      updateRoleMenuPermissionInput.id,
      updateRoleMenuPermissionInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RoleMenuPermission)
  removeRoleMenuPermission(@Args('id', { type: () => Int }) id: number) {
    return this.roleMenuPermissionsService.remove(id);
  }
}
