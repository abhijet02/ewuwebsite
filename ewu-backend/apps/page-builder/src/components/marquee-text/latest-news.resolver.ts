import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {  LatestNewsService } from './latest-news.service';
import { LatestNews } from '../entities/latest-news.entity';
import { CreateLatestNewsInput } from '../dto/create-latest-news.input';
import { UpdateLatestNewsInput } from '../dto/update-latest-news.input';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => LatestNews)
export class LatestNewsResolver {
  constructor(private readonly latestNewsService: LatestNewsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => LatestNews)
  createLatestNews(@Args('createLatestNewsInput') createLatestNewsInput: CreateLatestNewsInput) {
    return this.latestNewsService.create(createLatestNewsInput);
  }

  @Query(() => [LatestNews], { name: 'latestNews' })
  findAll(@Args('page') page:number, @Args('limit') limit:number) {
    return this.latestNewsService.findAll(page,limit);
  }

  @Query(() => LatestNews, { name: 'allLatestNews' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.latestNewsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => LatestNews)
  updateLatestNews(@Args('updateLatestNewsInput') updateLatestNewsInput: UpdateLatestNewsInput) {
    return this.latestNewsService.update(updateLatestNewsInput.id, updateLatestNewsInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => LatestNews)
  removeLatestNews(@Args('id', { type: () => Int }) id: number) {
    return this.latestNewsService.remove(id);
  }
}
