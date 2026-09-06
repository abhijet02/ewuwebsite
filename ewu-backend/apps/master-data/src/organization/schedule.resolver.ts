import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleInput, UpdateScheduleInput } from './dto/schedule.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Schedule)
  createSchedule(
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.scheduleService.create(createScheduleInput, userId);
  }

  @Query(() => [Schedule], { name: 'schedules' })
  findAll(
    @Args('page', { type: () => Int }) page,
    @Args('limit', { type: () => Int }) limit,
  ) {
    return this.scheduleService.findAll(page, limit);
  }

  @Query(() => Schedule, { name: 'schedule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Schedule)
  updateSchedule(
    @Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.scheduleService.update(
      updateScheduleInput.id,
      updateScheduleInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Schedule)
  removeSchedule(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.remove(id);
  }
}
