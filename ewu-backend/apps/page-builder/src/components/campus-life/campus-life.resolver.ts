import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { CampusLife } from './entities/campus-life.entity';
import { CampusLifeService } from './campus-life.service';
import {
  CreateCampusLifeInput,
  UpdateCampusLifeInput,
} from './dto/campus-life.input';

@Resolver(() => CampusLife)
export class CampusLifeResolver {
  constructor(private readonly campusLifeService: CampusLifeService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CampusLife)
  createCampusLife(
    @Args('createCampusLifeInput') createCampusLifeInput: CreateCampusLifeInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.campusLifeService.create(createCampusLifeInput, userId);
  }

  @Query(() => [CampusLife], { name: 'campusLifeContents' })
  findAllCampusLife(@Args('page') page: number, @Args('limit') limit: number) {
    return this.campusLifeService.findAll(page, limit);
  }

  @Query(() => CampusLife, { name: 'campusLifeContent' })
  findCampusLifeById(@Args('id') id: number) {
    return this.campusLifeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CampusLife)
  updateCampusLife(
    @Args('updateCampusLifeInput') updateCampusLifeInput: UpdateCampusLifeInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.campusLifeService.update(
      updateCampusLifeInput.id,
      updateCampusLifeInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CampusLife)
  removeCampusLife(@Args('id') id: number) {
    return this.campusLifeService.remove(id);
  }
}
