import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Achievement } from './entities/achievement.entity';
import { AchievementService } from './achievement.service';
import { CreateAchievementInput } from './dto/create-achievement.input';
import { UpdateAchievementInput } from './dto/update-achievement.input';

@Resolver(() => Achievement)
export class AchievementResolver {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Achievement)
  createAchievement(
    @Args('createAchievementInput')
    createAchievementInput: CreateAchievementInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.achievementService.create(createAchievementInput, userId);
  }

  @Query(() => [Achievement], { name: 'allAchievements' })
  findAll(
    @Args('page', { nullable: true}) page?: number, 
    @Args('limit',{ nullable: true}) limit?: number,
    @Args('pageId', { nullable: true}) pageId?: number 
  ) {
    return this.achievementService.findAll(page, limit, pageId);
  }

  // ✅ Get a single designation by ID
  @Query(() => Achievement, { name: 'achievement' })
  findById(@Args('id') id: string) {
    return this.achievementService.findOne(parseInt(id));
  }

  @Query(() => Achievement, { name: 'achievementBySlug' })
  findBySlug(@Args('slug') slug: string) {
    return this.achievementService.findBySlug(slug);
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Achievement)
  updateAchievement(
    @Args('updateAchievementInput')
    updateAchievementInput: UpdateAchievementInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.achievementService.update(
      updateAchievementInput.id,
      updateAchievementInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Achievement)
  async removeAchievement(@Args('id') id: number) {
    return this.achievementService.delete(id);
  }
}
