import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { NewsMedia } from './entities/news-media.entity';
import { NewsMediaService } from './news-media.service';
import {
  CreateNewsMediaInput,
  UpdateNewsMediaInput,
} from './dto/news-media.input';

@Resolver(() => NewsMedia)
export class NewsMediaResolver {
  constructor(private readonly newsMediaService: NewsMediaService) {}

  // ✅ Create
  @UseGuards(AuthGuard)
  @Mutation(() => NewsMedia)
  createNewsMedia(
    @Args('createNewsMediaInput') createNewsMediaInput: CreateNewsMediaInput,
    @Context() ctx: any,
  ) {
    const userId = ctx.user.id;
    return this.newsMediaService.create(createNewsMediaInput, userId);
  }

  // ✅ List all (optionally paginated)
  @Query(() => [NewsMedia], { name: 'allNewsMedia' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    return this.newsMediaService.findAll(page, limit);
  }

  // ✅ Get single by ID
  @Query(() => NewsMedia, { name: 'newsMedia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsMediaService.findOne(id);
  }

  // // ✅ Get single by Org ID
  // @Query(() => [NewsMedia], { name: 'newsMediaOfOrganization' })
  // findByOrgId(@Args('orgId', { type: () => Int }) orgId: number) {
  //   return this.newsMediaService.findByOrgId(orgId);
  // }

  // ✅ Update
  @UseGuards(AuthGuard)
  @Mutation(() => NewsMedia)
  updateNewsMedia(
    @Args('updateNewsMediaInput') updateNewsMediaInput: UpdateNewsMediaInput,
    @Context() ctx: any,
  ) {
    const userId = ctx.user.id;
    return this.newsMediaService.update(
      updateNewsMediaInput.id,
      updateNewsMediaInput,
      userId,
    );
  }

  // ✅ Delete
  @UseGuards(AuthGuard)
  @Mutation(() => NewsMedia)
  removeNewsMedia(@Args('id', { type: () => Int }) id: number) {
    return this.newsMediaService.delete(id);
  }
}
