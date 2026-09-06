import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, Injectable } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { ProgramCategory } from './entities/program-category.entity';
import { ProgramCategoryService } from './program-category.service';
import {
  CreateProgramCategoryInput,
  UpdateProgramCategoryInput,
} from './dto/program-category.input';

@Resolver(() => ProgramCategory)
@Injectable()
export class ProgramCategoryResolver {
  constructor(
    private readonly programCategoryService: ProgramCategoryService,
  ) {}

  // ✅ Create a new program category
  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCategory)
  createProgramCategory(
    @Args('createProgramCategoryInput')
    createProgramCategoryInput: CreateProgramCategoryInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.programCategoryService.createProgramCategory(
      createProgramCategoryInput,
      userId,
    );
  }

  // ✅ Get all program categories
  @Query(() => [ProgramCategory], { name: 'programCategories' })
  findAllProgramCategories(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return this.programCategoryService.getAllProgramCategories(page, limit);
  }

  // ✅ Get a single program category by ID
  @Query(() => ProgramCategory, { name: 'programCategory' })
  findProgramCategoryById(@Args('id') id: number) {
    return this.programCategoryService.getProgramCategoryById(id);
  }

  // ✅ Update a program category by ID
  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCategory)
  updateProgramCategory(
    @Args('updateProgramCategoryInput')
    updateProgramCategoryInput: UpdateProgramCategoryInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.programCategoryService.updateProgramCategory(
      updateProgramCategoryInput.id,
      updateProgramCategoryInput,
      userId,
    );
  }

  // ✅ Delete a program category by ID
  @UseGuards(AuthGuard)
  @Mutation(() => ProgramCategory)
  deleteProgramCategory(@Args('id') id: number) {
    return this.programCategoryService.deleteProgramCategory(id);
  }
}
