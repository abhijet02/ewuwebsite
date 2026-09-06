import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { FollowUs } from './entities/follow-us.entity';
import { FollowUsService } from './follow-us.service';
import { CreateFollowUsInput } from './dto/follow-us.input';
import { UpdateFollowUsInput } from './dto/follow-us.input';

@Resolver(() => FollowUs)
export class FollowUsResolver {
  constructor(private readonly followUsService: FollowUsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => FollowUs)
  createFolowUs(
    @Args('createFollowUsInput') input: CreateFollowUsInput,
    @Context() ctx,
  ) {
    return this.followUsService.create(input, ctx.user.id);
  }

  @Query(() => [FollowUs], { name: 'followUsList' })
  findAllFolowUs(
    @Args('page', { type: () => Int, nullable: true }) page = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit = 10,
  ) {
    return this.followUsService.findAll(page, limit);
  }

  @Query(() => FollowUs, { name: 'followUs' })
  findFolowUsById(@Args('id', { type: () => Int }) id: number) {
    return this.followUsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FollowUs)
  updateFolowUs(
    @Args('updateFollowUsInput') input: UpdateFollowUsInput,
    @Context() ctx,
  ) {
    return this.followUsService.update(input.id, input, ctx.user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FollowUs)
  removeFolowUs(@Args('id', { type: () => Int }) id: number) {
    return this.followUsService.remove(id);
  }
}
