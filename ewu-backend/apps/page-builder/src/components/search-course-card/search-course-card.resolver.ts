import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { SearchCourseCard } from './entities/search-course-card.entity';
import { SearchCourseCardService } from './search-course-card.service';
import {
  CreateSearchCourseCardInput,
  UpdateSearchCourseCardInput,
} from './dto/searh-course-card.input';

@Resolver(() => SearchCourseCard)
export class SearchCourseCardResolver {
  constructor(
    private readonly searchCourseCardService: SearchCourseCardService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => SearchCourseCard)
  createSearchCourseCard(
    @Args('createSearchCourseCardInput') input: CreateSearchCourseCardInput,
    @Context() ctx,
  ) {
    return this.searchCourseCardService.create(input, ctx.user.id);
  }

  @Query(() => [SearchCourseCard], { name: 'searchCourseCards' })
  findAllSearchCourseCards(
    @Args('page', { type: () => Int, nullable: true }) page,
    @Args('limit', { type: () => Int, nullable: true }) limit,
  ) {
    return this.searchCourseCardService.findAll(page, limit);
  }

  @Query(() => SearchCourseCard, { name: 'searchCourseCard' })
  findSearchCourseCardById(@Args('id', { type: () => Int }) id: number) {
    return this.searchCourseCardService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SearchCourseCard)
  updateSearchCourseCard(
    @Args('updateSearchCourseCardInput') input: UpdateSearchCourseCardInput,
    @Context() ctx,
  ) {
    return this.searchCourseCardService.update(input.id, input, ctx.user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SearchCourseCard)
  removeSearchCourseCard(@Args('id', { type: () => Int }) id: number) {
    return this.searchCourseCardService.remove(id);
  }
}
