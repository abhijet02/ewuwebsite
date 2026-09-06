import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { BuilderService } from './builder.service';
import { Builder } from './entities/builder.entity';
import { CreateBuilderInput } from './dto/create-builder.input';
import { UpdateBuilderInput } from './dto/update-builder.input';

@Resolver(() => Builder)
export class BuilderResolver {
  constructor(private readonly builderService: BuilderService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Builder)
  createBuilder(@Args('createBuilderInput') createBuilderInput: CreateBuilderInput,@Context() ctx,) {
    const userId = ctx.user.id;
    return this.builderService.create(createBuilderInput,userId);
  }

  @Query(() => [Builder], { name: 'builders' })
  findAll(
    @Args('page', { nullable: true}) page?: number, 
    @Args('limit',  { nullable: true}) limit?: number, 
    @Args('pageId', { nullable: true}) pageId?: number 
  ) {
    return this.builderService.findAll(page,limit, pageId);
  }

  @Query(() => Builder, { name: 'builder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.builderService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Builder)
  updateBuilder(@Args('updateBuilderInput') updateBuilderInput: UpdateBuilderInput,@Context() ctx) {
    const userId = ctx.user.id;
    return this.builderService.update(updateBuilderInput.id, updateBuilderInput,userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Builder)
  removeBuilder(@Args('id', { type: () => Int }) id: number) {
    return this.builderService.remove(id);
  }
}
