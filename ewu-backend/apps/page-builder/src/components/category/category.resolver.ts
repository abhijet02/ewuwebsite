import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { CategoryService } from './category.service';
import { Category } from '../entities/category.entity';
import { CreateCategory } from '../dto/create-category.input';
import { UpdateCategory } from '../dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Category)
  createCategory(@Args('data') data: CreateCategory) {
    return this.categoryService.create(data);
  }

  @Query(() => [Category], { name: 'categories' })
  findAllCategory(@Args('page') page: number, @Args('limit') limit: number) {
    return this.categoryService.findAll(page, limit);
  }

  @Query(() => Category, { name: 'category' })
  findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Query(() => Category, { name: 'categoryByComponentId' })
  getCategoryByComponent(
    @Args('componentId', { type: () => Int }) componentId: number,
  ) {
    return this.categoryService.getCategoryByComponent(componentId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Category)
  updateCategory(@Args('data') data: UpdateCategory) {
    return this.categoryService.update(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
