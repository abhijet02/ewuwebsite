import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { WhyChooseDepartmentService } from './why-choose-department.service';
import { WhyChooseDepartment } from './entities/why-choose-department.entity';
import {
  CreateWhyChooseDepartmentInput,
  UpdateWhyChooseDepartmentInput,
} from './dto/why-choose-department.input';

@Resolver(() => WhyChooseDepartment)
export class WhyChooseDepartmentResolver {
  constructor(
    private readonly whyChooseDepartmentService: WhyChooseDepartmentService,
  ) {}

  // Fetch all departments with pagination
  @Query(() => [WhyChooseDepartment], { name: 'whyChooseDepartments' })
  async getWhyChooseDepartments(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<WhyChooseDepartment[]> {
    return this.whyChooseDepartmentService.findAll(page, limit);
  }

  // Fetch a single department by ID
  @Query(() => WhyChooseDepartment, { name: 'whyChooseDepartment' })
  async getWhyChooseDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<WhyChooseDepartment> {
    return this.whyChooseDepartmentService.findOne(id);
  }

  // Create a new department
  @UseGuards(AuthGuard)
  @Mutation(() => WhyChooseDepartment)
  async createWhyChooseDepartment(
    @Args('createWhyChooseDepartmentInput')
    createWhyChooseDepartmentInput: CreateWhyChooseDepartmentInput,
    @Context() ctx,
  ): Promise<WhyChooseDepartment> {
    const userId = ctx.user.id;
    return this.whyChooseDepartmentService.create(
      createWhyChooseDepartmentInput,
      userId,
    );
  }

  // Update an existing department
  @UseGuards(AuthGuard)
  @Mutation(() => WhyChooseDepartment)
  async updateWhyChooseDepartment(
    @Args('updateWhyChooseDepartmentInput')
    updateWhyChooseDepartmentInput: UpdateWhyChooseDepartmentInput,
    @Context() ctx,
  ): Promise<WhyChooseDepartment> {
    const userId = ctx.user.id;
    return this.whyChooseDepartmentService.update(
      updateWhyChooseDepartmentInput.id,
      updateWhyChooseDepartmentInput,
      userId,
    );
  }

  // Delete a department by ID
  @UseGuards(AuthGuard)
  @Mutation(() => WhyChooseDepartment)
  async removeWhyChooseDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<WhyChooseDepartment> {
    return await this.whyChooseDepartmentService.remove(id);
  }
}
