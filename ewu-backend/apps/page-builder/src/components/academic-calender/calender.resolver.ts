import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Calender } from './entities/calender.entity';
import { CreateCalenderInput } from './dto/create-calender.input';
import { CalenderService } from './calender.service';
import { UpdateCalenderInput } from './dto/update-calender.input';

@Resolver(() => Calender)
export class CalenderResolver {
  constructor(private readonly calenderService: CalenderService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Calender)
  createCalenderDate(
    @Args('createCalenderInput') createCalenderInput: CreateCalenderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.calenderService.create(createCalenderInput, userId);
  }

  @Query(() => [Calender], { name: 'calenderDates' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.calenderService.findAll(page, limit);
  }

  @Query(() => Calender, { name: 'calenderDate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.calenderService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Calender)
  updateCalenderDate(
    @Args('updateCalenderInput') updateCalenderInput: UpdateCalenderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.calenderService.update(
      updateCalenderInput.id,
      updateCalenderInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Calender)
  removeCalenderDate(@Args('id', { type: () => Int }) id: number) {
    return this.calenderService.remove(id);
  }
}
