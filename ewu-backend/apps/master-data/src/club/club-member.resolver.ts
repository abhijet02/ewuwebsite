import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards, Injectable } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { ClubMemberService } from './club-member.service';
import { ClubMember } from './entities/club-member.entity';
import {
  CreateClubMemberInput,
  UpdateClubMemberInput,
} from './dto/club-member.input';

@Resolver(() => ClubMember)
@Injectable()
export class ClubMemberResolver {
  constructor(private readonly clubMemberService: ClubMemberService) {}

  @Query(() => [ClubMember], { name: 'clubMembers' })
  async getClubMembers(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<ClubMember[]> {
    return this.clubMemberService.findAll(page, limit);
  }

  @Query(() => ClubMember, { name: 'clubMember' })
  async getClubMember(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ClubMember> {
    return this.clubMemberService.findOne(id);
  }

  @Mutation(() => ClubMember)
  async createClubMember(
    @Args('createClubMemberInput') createClubMemberInput: CreateClubMemberInput,
  ): Promise<ClubMember> {
    return this.clubMemberService.create(createClubMemberInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ClubMember)
  async updateClubMember(
    @Args('updateClubMemberInput') updateClubMemberInput: UpdateClubMemberInput,
    @Context() ctx,
  ): Promise<ClubMember> {
    const userId = ctx.user.id;
    return this.clubMemberService.update(
      updateClubMemberInput.id,
      updateClubMemberInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ClubMember)
  async removeClubMember(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ClubMember> {
    return this.clubMemberService.remove(id);
  }
}
