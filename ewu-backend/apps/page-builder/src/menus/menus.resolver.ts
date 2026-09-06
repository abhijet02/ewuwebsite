import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MenusService } from './menus.service';
import { Menu } from './entities/menu.entity';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { MenusPaginationResponse } from './entities/menu.pagination.response';

@Resolver(() => Menu)
export class MenusResolver {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Menu)
  createMenu(@Args('createMenuInput') createMenuInput: CreateMenuInput) {
    return this.menusService.create(createMenuInput);
  }

  @Query(() => [Menu], { name: 'menus' })
  findAll(@Args('page') page:number, @Args('limit') limit:number) {
    return this.menusService.findAll(page,limit);
  }

  @Query(() => MenusPaginationResponse, { name: 'menusByPagination' })
  findAllByPagination(@Args('page') page:number, @Args('limit') limit:number) {
    return this.menusService.findAllByPagination(page,limit);
  }

  @Query(() => [Menu], { name: 'menusWithPageIdZero' })
  findAllMenusWithPageIdZero(
    @Args('page') page:number, 
    @Args('limit') limit:number
  ) {
    return this.menusService.findAllMenusWithPageIdZero(page,limit);
  }

  @Query(() => [Menu], { name: 'menusWithSamePageId' })
  findAllMenusWithSamePageId(
    @Args('pageId') pageId:number,
    @Args('page') page:number, 
    @Args('limit') limit:number
  ) {
    return this.menusService.findAllMenusWithSamePageId(pageId,page,limit);
  }

  @Query(() => Menu, { name: 'menu' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.menusService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Menu)
  updateMenu(@Args('updateMenuInput') updateMenuInput: UpdateMenuInput) {
    return this.menusService.update(updateMenuInput.id, updateMenuInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Menu)
  removeMenu(@Args('id', { type: () => Int }) id: number) {
    return this.menusService.remove(id);
  }
}
