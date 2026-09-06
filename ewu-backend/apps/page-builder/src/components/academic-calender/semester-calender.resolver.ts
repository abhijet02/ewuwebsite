import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { SemesterCalender } from './entities/semester-calender.entity';
import { SemesterCalenderService } from './semester-calender.service';
import { CreateSemesterCalenderInput } from './dto/create-semester-calender.input';
import { UpdateSemesterCalenderInput } from './dto/update-semester-calender.input';

@Resolver(() => SemesterCalender)
export class SemesterCalenderResolver {
  constructor(
    private readonly semesterCalenderService: SemesterCalenderService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => SemesterCalender)
  createSemesterCalender(
    @Args('createSemesterCalenderInput')
    createSemesterCalenderInput: CreateSemesterCalenderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.semesterCalenderService.create(
      createSemesterCalenderInput,
      userId,
    );
  }

  @Query(() => [SemesterCalender], { name: 'SemesterCalenders' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.semesterCalenderService.findAll(page, limit);
  }

  @Query(() => SemesterCalender, { name: 'SemesterCalender' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.semesterCalenderService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SemesterCalender)
  updateSemesterCalender(
    @Args('updateSemesterCalenderInput')
    updateSemesterCalenderInput: UpdateSemesterCalenderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.semesterCalenderService.update(
      updateSemesterCalenderInput.id,
      updateSemesterCalenderInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SemesterCalender)
  removeSemesterCalender(@Args('id', { type: () => Int }) id: number) {
    return this.semesterCalenderService.remove(id);
  }
}
