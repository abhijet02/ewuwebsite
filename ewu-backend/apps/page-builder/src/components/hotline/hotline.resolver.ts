import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Hotline } from './entities/hotline.entity';
import { HotlineService } from './hotline.service';
import { CreateHotlineInput, UpdateHotlineInput } from './dto/hotline.input';

@Resolver(() => Hotline)
export class HotlineResolver {
  constructor(private readonly hotlineService: HotlineService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Hotline)
  createHotline(
    @Args('createHotlineInput') input: CreateHotlineInput,
    @Context() ctx,
  ) {
    return this.hotlineService.create(input, ctx.user.id);
  }

  @Query(() => [Hotline], { name: 'hotlines' })
  findAllHotlines(
    @Args('page', { type: () => Int, nullable: true }) page,
    @Args('limit', { type: () => Int, nullable: true }) limit,
  ) {
    return this.hotlineService.findAll(page, limit);
  }

  @Query(() => Hotline, { name: 'hotline' })
  findHotlineById(@Args('id', { type: () => Int }) id: number) {
    return this.hotlineService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Hotline)
  updateHotline(
    @Args('updateHotlineInput') input: UpdateHotlineInput,
    @Context() ctx,
  ) {
    return this.hotlineService.update(input.id, input, ctx.user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Hotline)
  removeHotline(@Args('id', { type: () => Int }) id: number) {
    return this.hotlineService.remove(id);
  }
}
