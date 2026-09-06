import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { SuccessCard } from './entities/success-card.entity';
import { SuccessCardService } from './success-card.service';
import {
  CreateSuccessCardInput,
  UpdateSuccessCardInput,
} from './dto/success-card.input';

@Resolver(() => SuccessCard)
export class SuccessCardResolver {
  constructor(private readonly successCardService: SuccessCardService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => SuccessCard)
  createSuccessCard(
    @Args('createSuccessCardInput')
    createSuccessCardInput: CreateSuccessCardInput,
    @Context() ctx,
  ) {
    return this.successCardService.create(createSuccessCardInput, ctx.user.id);
  }

  @Query(() => [SuccessCard], { name: 'successCards' })
  findAllSuccessCards(
    @Args('page', { type: () => Int, nullable: true }) page = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit = 10,
  ) {
    return this.successCardService.findAll(page, limit);
  }

  @Query(() => SuccessCard, { name: 'successCard' })
  findSuccessCardById(@Args('id', { type: () => Int }) id: number) {
    return this.successCardService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SuccessCard)
  updateSuccessCard(
    @Args('updateSuccessCardInput')
    updateSuccessCardInput: UpdateSuccessCardInput,
    @Context() ctx,
  ) {
    return this.successCardService.update(
      updateSuccessCardInput.id,
      updateSuccessCardInput,
      ctx.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SuccessCard)
  removeSuccessCard(@Args('id', { type: () => Int }) id: number) {
    return this.successCardService.remove(id);
  }
}
