import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ViewAllService } from './view-all.service';
import { ViewAll } from './entities/view-all.entity';
import { CreateViewAllInput, UpdateViewAllInput } from './dto/view-all.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => ViewAll)
export class ViewAllResolver {
  constructor(private readonly viewAllService: ViewAllService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ViewAll)
  async createViewAll(
    @Args('createViewAllInput') createViewAllInput: CreateViewAllInput,
    @Context() ctx,
  ): Promise<ViewAll> {
    const userId = ctx.user.id;
    return await this.viewAllService.create(createViewAllInput, userId);
  }

  @Query(() => [ViewAll], { name: 'viewAlls' })
  async findAll(
    @Args('page', { nullable: true}) page?: number, 
    @Args('limit',{ nullable: true}) limit?: number,
    @Args('pageId', { nullable: true}) pageId?: number,
    @Args('componentId', { nullable: true}) componentId?: number,
  ): Promise<ViewAll[]> {
    return await this.viewAllService.findAll(page,limit, pageId,componentId );
  }

  @Query(() => ViewAll, { name: 'viewAll' })
  async findOne(
    @Args('id') id: number,
  ): Promise<ViewAll> {
    return await this.viewAllService.findOne(id);
  }

  @Query(() => [ViewAll], { name: 'viewAllsByComponent' })
  async findByComponentId(
    @Args('componentId', { type: () => Int }) componentId: number,
  ): Promise<ViewAll[]> {
    return await this.viewAllService.findByComponentId(componentId);
  }

  @Query(() => [ViewAll], { name: 'viewAllsByPage' })
  async findByPageId(
    @Args('pageId', { type: () => Int }) pageId: number,
  ): Promise<ViewAll[]> {
    return await this.viewAllService.findByPageId(pageId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ViewAll)
  async updateViewAll(
    @Args('updateViewAllInput') updateViewAllInput: UpdateViewAllInput,
    @Context() ctx,
  ): Promise<ViewAll> {
    const userId = ctx.user.id;
    return await this.viewAllService.update(updateViewAllInput.id,updateViewAllInput, userId);
  }

  @Mutation(() => Boolean)
  async removeViewAll(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return await this.viewAllService.remove(id);
  }

}