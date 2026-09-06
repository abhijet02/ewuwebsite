import { Injectable } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from './dto/department.input';

@Resolver(() => Department)
@Injectable()
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  // Fetch all departments
  @Query(() => [Department])
  async getDepartments(
    @Args('page', { type: () => Number, nullable: true }) page: number,
    @Args('limit', { type: () => Number, nullable: true }) limit: number,
  ): Promise<Department[]> {
    return this.departmentService.getDepartments(page, limit);
  }

  // Fetch a single department by ID
  @Query(() => Department)
  async getDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return this.departmentService.getDepartment(id);
  }

  // Fetch departments by faculty ID
  @Query(() => [Department])
  async getDepartmentsByFaculty(
    @Args('facultyId', { type: () => Int }) facultyId: number,
  ): Promise<Department[]> {
    return this.departmentService.getDepartmentsByFaculty(facultyId);
  }

  // Create a new department
  @UseGuards(AuthGuard)
  @Mutation(() => Department)
  async createDepartment(
    @Args('input') input: CreateDepartmentInput,
    @Context() ctx,
  ): Promise<Department> {
    const userId = ctx.user.id;
    return this.departmentService.createDepartment(input, userId);
  }

  // Update an existing department
  @UseGuards(AuthGuard)
  @Mutation(() => Department)
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDepartmentInput,
    @Context() ctx,
  ): Promise<Department> {
    const userId = ctx.user.id;
    return this.departmentService.updateDepartment(id, input, userId);
  }

  // Delete a department by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Department)
  async deleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return this.departmentService.deleteDepartment(id);
  }
}
