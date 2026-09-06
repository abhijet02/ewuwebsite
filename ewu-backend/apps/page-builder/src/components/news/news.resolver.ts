import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { News } from './entities/news.entity';
import { NewsService } from './news.service';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => News)
  createNews(
    @Args('createNewsInput') createNewsInput: CreateNewsInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.newsService.create(createNewsInput, userId);
  }

  @Query(() => [News], { name: 'allnews' })
  findAll( @Args('page', { nullable: true}) page?: number, 
    @Args('limit',{ nullable: true}) limit?: number,
    @Args('pageId', { nullable: true}) pageId?: number ) {
    return this.newsService.findAll(page, limit, pageId);
  }

  // ✅ Get a single designation by ID
  @Query(() => News, { name: 'news' })
  findById(@Args('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Query(() => News, { name: 'newsBySlug' })
  findBySlug(@Args('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => News)
  updateNews(
    @Args('updateNewsInput') updateNewsInput: UpdateNewsInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.newsService.update(updateNewsInput.id, updateNewsInput, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => News)
  async removeNews(@Args('id') id: number) {
    return this.newsService.delete(id);
  }
}
