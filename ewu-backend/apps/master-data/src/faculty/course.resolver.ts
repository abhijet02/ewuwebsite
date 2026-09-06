import { Injectable, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput, UpdateCourseInput } from './dto/course.input';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Course)
@Injectable()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  // Fetch all courses with optional pagination
  @Query(() => [Course])
  async getCourses(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<Course[]> {
    //{
    //data: Course[];
    //total: number;
    //page: number;
    // totalPages: number;
    //}
    return this.courseService.findAll(page, limit);
  }

  // Fetch a single course by ID
  @Query(() => Course)
  async getCourse(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Course> {
    return this.courseService.findOne(id);
  }

  // Create a new course
  @UseGuards(AuthGuard)
  @Mutation(() => Course)
  async createCourse(
    @Args('input') input: CreateCourseInput,
    @Context() ctx,
  ): Promise<Course> {
    const userId = ctx.user.id;
    return this.courseService.create(input, userId);
  }

  // Update an existing course
  @UseGuards(AuthGuard)
  @Mutation(() => Course)
  async updateCourse(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateCourseInput,
    @Context() ctx,
  ): Promise<Course> {
    const userId = ctx.user.id;
    return this.courseService.update(id, input, userId);
  }

  // Delete a course by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Course)
  async deleteCourse(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Course> {
    return this.courseService.remove(id);
  }
}
