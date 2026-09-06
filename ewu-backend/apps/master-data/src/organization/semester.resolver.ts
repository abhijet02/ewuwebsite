import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards, Injectable } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { SemesterService } from './semester.service';
import { Semester } from './entities/semester.entity';
import { CreateSemesterInput, UpdateSemesterInput } from './dto/semester.input';

@Resolver(() => Semester)
@Injectable()
export class SemesterResolver {
  constructor(private readonly semesterService: SemesterService) {}

  @Query(() => [Semester], { name: 'semesters' })
  async getSemesters(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<Semester[]> {
    return this.semesterService.findAll(page,limit);
  }

  @Query(() => Semester, { name: 'semester' })
  async getSemester(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Semester> {
    return this.semesterService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Semester)
  async createSemester(
    @Args('createSemesterInput') input: CreateSemesterInput,
    @Context() ctx,
  ): Promise<Semester> {
    const userId = ctx.user.id;
    return this.semesterService.create(input, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Semester)
  async updateSemester(
    @Args('updateSemesterInput') input: UpdateSemesterInput,
    @Context() ctx,
  ): Promise<Semester> {
    const userId = ctx.user.id;
    return this.semesterService.update(input.id, input, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Semester)
  async removeSemester(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Semester> {
    return this.semesterService.remove(id);
  }
}
