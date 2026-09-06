import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminMenu } from './entities/admin-menu.entity';
import { CreateAdminMenuInput } from './dto/create-admin-menu.input';
import { UpdateAdminMenuInput } from './dto/update-admin-menu.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { AdminMenusService } from './admin-menu.service';

@Resolver(() => AdminMenu)
export class AdminMenusResolver {
  constructor(private readonly adminMenusService: AdminMenusService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => AdminMenu)
  createAdminMenu(
    @Args('createAdminMenuInput') createAdminMenuInput: CreateAdminMenuInput,
  ) {
    return this.adminMenusService.create(createAdminMenuInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [AdminMenu], { name: 'adminMenus' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.adminMenusService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Query(() => AdminMenu, { name: 'adminMenu' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminMenusService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdminMenu)
  updateAdminMenu(
    @Args('updateAdminMenuInput') updateAdminMenuInput: UpdateAdminMenuInput,
  ) {
    return this.adminMenusService.update(
      updateAdminMenuInput.id,
      updateAdminMenuInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdminMenu)
  removeAdminMenu(@Args('id', { type: () => Int }) id: number) {
    return this.adminMenusService.remove(id);
  }
}
