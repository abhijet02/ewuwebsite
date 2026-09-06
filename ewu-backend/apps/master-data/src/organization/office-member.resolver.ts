import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OfficeMemberService } from './office-member.service';
import { OfficeMember } from './entities/office-member.entity';
import {
  CreateOfficeMemberInput,
  UpdateOfficeMemberInput,
} from './dto/office-member.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => OfficeMember)
export class OfficeMemberResolver {
  constructor(private readonly officeMemberService: OfficeMemberService) {}

  @Mutation(() => OfficeMember)
  createOfficeMemberRequest(
    @Args('createOfficeMemberRequestInput')
    createOfficeMemberRequestInput: CreateOfficeMemberInput,
  ) {
    return this.officeMemberService.create(createOfficeMemberRequestInput, 0);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeMember)
  createOfficeMember(
    @Args('createOfficeMemberInput')
    createOfficeMemberInput: CreateOfficeMemberInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeMemberService.create(createOfficeMemberInput, userId);
  }

  @Query(() => [OfficeMember], { name: 'officeMembers' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.officeMemberService.findAll(page, limit);
  }

  @Query(() => OfficeMember, { name: 'officeMember' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.officeMemberService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeMember)
  updateOfficeMember(
    @Args('updateOfficeMemberInput')
    updateOfficeMemberInput: UpdateOfficeMemberInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeMemberService.update(
      updateOfficeMemberInput.id,
      updateOfficeMemberInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeMember)
  removeOfficeMember(@Args('id', { type: () => Int }) id: number) {
    return this.officeMemberService.remove(id);
  }
}
