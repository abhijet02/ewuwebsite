import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { ProgramCalender } from './entities/program-calender.entity';
import { CreateProgramCalenderInput } from './dto/create-program-calender.input';
import { UpdateProgramCalenderInput } from './dto/update-program-calender.input';
import { ProgramCalenderService } from './program-calender.service';

@Resolver(() => ProgramCalender)
export class ProgramCalenderResolver {
  constructor(
    private readonly programCalenderService: ProgramCalenderService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCalender)
  createProgramCalender(
    @Args('createProgramCalenderInput')
    createProgramCalenderInput: CreateProgramCalenderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.programCalenderService.create(
      createProgramCalenderInput,
      userId,
    );
  }

  @Query(() => [ProgramCalender], { name: 'ProgramCalenders' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.programCalenderService.findAll(page, limit);
  }

  @Query(() => ProgramCalender, { name: 'ProgramCalender' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.programCalenderService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCalender)
  updateProgramCalender(
    @Args('updateProgramCalenderInput')
    updateProgramCalenderInput: UpdateProgramCalenderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.programCalenderService.update(
      updateProgramCalenderInput.id,
      updateProgramCalenderInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCalender)
  removeProgramCalender(@Args('id', { type: () => Int }) id: number) {
    return this.programCalenderService.remove(id);
  }
}
