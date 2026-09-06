import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PoeService } from './poe.service';
import { Poe } from './entities/poe.entity';
import { CreatePoeInput, UpdatePoeInput } from './dto/poe.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Poe)
export class PoeResolver {
  constructor(private readonly poeService: PoeService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Poe)
  createPoe(
    @Args('createPoeInput') createPoeInput: CreatePoeInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.poeService.create(createPoeInput, userId);
  }

  @Query(() => [Poe], { name: 'poes' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ) {
    return this.poeService.findAll(page, limit);
  }

  @Query(() => Poe, { name: 'poe' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.poeService.findOne(id);
  }

  @Query(() => Poe, { name: 'poeByDepartment' })
  findByDepartment(
    @Args('departmentId', { type: () => Int }) departmentId: number,
  ) {
    return this.poeService.findByDepartment(departmentId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Poe)
  updatePoe(
    @Args('updatePoeInput') updatePoeInput: UpdatePoeInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.poeService.update(updatePoeInput.id, updatePoeInput, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Poe)
  removePoe(@Args('id', { type: () => Int }) id: number) {
    return this.poeService.remove(id);
  }
}
