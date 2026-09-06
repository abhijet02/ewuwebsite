import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Club } from './entities/club.entity';
import { CreateClubInput, UpdateClubInput } from './dto/club.input';
import { ClubService } from './club.service';

@Resolver(() => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Club)
  createClub(
    @Args('createClubInput')
    createClubInput: CreateClubInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.clubService.create(createClubInput, userId);
  }

  @Query(() => [Club], { name: 'allClub' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.clubService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => Club, { name: 'club' })
  findById(@Args('id') id: string) {
    return this.clubService.findOne(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Club)
  updateClub(
    @Args('updateClubInput')
    updateClubInput: UpdateClubInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.clubService.update(updateClubInput.id, updateClubInput, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Club)
  async removeClub(@Args('id') id: number) {
    return this.clubService.delete(id);
  }
}
