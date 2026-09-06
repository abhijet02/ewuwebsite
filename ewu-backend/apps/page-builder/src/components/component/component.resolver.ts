import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Component } from '../entities/component.entity';
import { ComponentService } from './component.service';
import { CreateComponentInput } from '../dto/create-component.input';
import { UpdateComponentInput } from '../dto/update-component.input';

@Resolver(() => Component)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Component)
  createComponent(
    @Args('createComponentInput') createComponentInput: CreateComponentInput,
  ) {
    return this.componentService.create(createComponentInput);
  }

  @Query(() => [Component], { name: 'components' })
  findAllComponent(@Args('page') page: number, @Args('limit') limit: number) {
    return this.componentService.findAll(page, limit);
  }

  @Query(() => Component, { name: 'component' })
  findOneComponent(@Args('id', { type: () => Int }) id: number) {
    return this.componentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Component)
  updateComponent(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateComponentInput') updateComponentInput: UpdateComponentInput,
  ) {
    return this.componentService.update(id, updateComponentInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Component)
  removeComponent(@Args('id', { type: () => Int }) id: number) {
    return this.componentService.remove(id);
  }
}
