import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Role)
  createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.rolesService.create(createRoleInput, userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Role], { name: 'roles' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.rolesService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Role)
  updateRole(
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.rolesService.update(
      updateRoleInput.id,
      updateRoleInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }
}
