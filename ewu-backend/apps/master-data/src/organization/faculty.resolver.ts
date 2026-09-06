import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Faculty } from './entities/faculty.entity';
import { CreatefacultyInput } from './dto/create-faculty.input';
import { UpdateFacultyInput } from './dto/update-faculty.input';
import { FacultyService } from './faculty.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Faculty)
export class FacultyResolver {
  constructor(private readonly facultyService: FacultyService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Faculty)
  createFaculty(
    @Args('createfacultyInput') createfacultyInput: CreatefacultyInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.facultyService.create(createfacultyInput, userId);
  }

  @Query(() => [Faculty], { name: 'faculties' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.facultyService.findAll(page, limit);
  }

  @Query(() => Faculty, { name: 'faculty' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.facultyService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Faculty)
  updatefaculty(
    @Args('updateFacultyInput')
    updateFacultyInput: UpdateFacultyInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.facultyService.update(
      updateFacultyInput.id,
      updateFacultyInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Faculty)
  removefaculty(@Args('id', { type: () => Int }) id: number) {
    return this.facultyService.remove(id);
  }
}
