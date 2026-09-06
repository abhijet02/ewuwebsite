import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { ProgramCard } from './entities/program-card.entity';
import { ProgramCardService } from './program-card.service';
import {
  CreateProgramCardInput,
  UpdateProgramCardInput,
} from './dto/program-card.input';

@Resolver(() => ProgramCard)
export class ProgramCardResolver {
  constructor(private readonly programCardService: ProgramCardService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCard)
  createProgramCard(
    @Args('createProgramCardInput') input: CreateProgramCardInput,
    @Context() ctx,
  ) {
    return this.programCardService.create(input, ctx.user.id);
  }

  @Query(() => [ProgramCard], { name: 'programCards' })
  findAllProgramCards(
    @Args('page', { type: () => Int, nullable: true }) page,
    @Args('limit', { type: () => Int, nullable: true }) limit,
  ) {
    return this.programCardService.findAll(page, limit);
  }

  @Query(() => ProgramCard, { name: 'programCard' })
  findProgramCardById(@Args('id', { type: () => Int }) id: number) {
    return this.programCardService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCard)
  updateProgramCard(
    @Args('updateProgramCardInput') input: UpdateProgramCardInput,
    @Context() ctx,
  ) {
    return this.programCardService.update(input.id, input, ctx.user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCard)
  removeProgramCard(@Args('id', { type: () => Int }) id: number) {
    return this.programCardService.remove(id);
  }
}
