import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, Injectable } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Program } from './entities/program.entity';
import { ProgramService } from './program.service';
import { CreateProgramInput, UpdateProgramInput } from './dto/program-input';

@Resolver(() => Program)
@Injectable()
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  // ✅ Create a new program
  @UseGuards(AuthGuard)
  @Mutation(() => Program)
  createProgram(
    @Args('createProgramInput') createProgramInput: CreateProgramInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.programService.createProgram(createProgramInput, userId);
  }

  // ✅ Get all programs
  @Query(() => [Program], { name: 'programs' })
  findAllPrograms(@Args('page') page: number, @Args('limit') limit: number) {
    return this.programService.getAllPrograms(page, limit);
  }

  // ✅ Get a single program by ID
  @Query(() => Program, { name: 'program' })
  findProgramById(@Args('id') id: number) {
    return this.programService.getProgramById(id);
  }

  // ✅ Update a program by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Program)
  updateProgram(
    @Args('updateProgramInput') updateProgramInput: UpdateProgramInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.programService.updateProgram(
      updateProgramInput.id,
      updateProgramInput,
      userId,
    );
  }

  // ✅ Delete a program by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Program)
  deleteProgram(@Args('id') id: number) {
    return this.programService.deleteProgram(id);
  }
}
