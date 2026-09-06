// src/description/descriptions.resolver.ts

import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { DescriptionsService } from '../description/description.service'
import { Description } from '../entities/description.entity';
import { CreateDescriptionInput, UpdateDescriptionInput } from '../dto/description.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Description)
export class DescriptionsResolver {
  constructor(private readonly descriptionsService: DescriptionsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Description)
  createDescription(
    @Args('createDescriptionInput') createDescriptionInput: CreateDescriptionInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.descriptionsService.create(createDescriptionInput,userId);
  }

  @Query(() => [Description], { name: 'descriptions' })
  findAll(
    @Args('page', { type: () => Int}) page,
    @Args('limit', { type: () => Int}) limit,
  ) {
    return this.descriptionsService.findAll(page, limit);
  }

  @Query(() => Description, { name: 'description' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.descriptionsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Description)
  updateDescription(
    @Args('updateDescriptionInput') updateDescriptionInput: UpdateDescriptionInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.descriptionsService.update(updateDescriptionInput.id, updateDescriptionInput,userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Description)
  removeDescription(@Args('id', { type: () => Int }) id: number) {
    return this.descriptionsService.remove(id);
  }
}
