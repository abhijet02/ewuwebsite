import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { ClubActivityRanking } from './entities/club-activity-ranking.input';
import { ClubActivityRankingService } from './club-activity-ranking.service';
import {
  CreateClubActivityRankingInput,
  UpdateClubActivityRankingInput,
} from './dto/club-activity-ranking.input';

@Resolver(() => ClubActivityRanking)
export class ClubActivityRankingResolver {
  constructor(
    private readonly clubActivityRankingService: ClubActivityRankingService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ClubActivityRanking)
  createClubActivityRanking(
    @Args('createClubActivityRankingInput')
    createClubActivityRankingInput: CreateClubActivityRankingInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.clubActivityRankingService.create(
      createClubActivityRankingInput,
      userId,
    );
  }

  @Query(() => [ClubActivityRanking], { name: 'allClubActivityRanking' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.clubActivityRankingService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => ClubActivityRanking, { name: 'clubActivityRanking' })
  findById(@Args('id') id: string) {
    return this.clubActivityRankingService.findOne(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => ClubActivityRanking)
  updateClubActivityRanking(
    @Args('updateClubActivityRankingInput')
    updateClubActivityRankingInput: UpdateClubActivityRankingInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.clubActivityRankingService.update(
      updateClubActivityRankingInput.id,
      updateClubActivityRankingInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ClubActivityRanking)
  async removeClubActivityRanking(@Args('id') id: number) {
    return this.clubActivityRankingService.delete(id);
  }
}
