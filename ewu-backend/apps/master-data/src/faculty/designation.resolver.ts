import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, Injectable } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Designation } from './entities/designation.entity';
import { DesignationService } from './designation.service';
import { CreateDesignation, UpdateDesignation } from './dto/designation.input';

@Resolver(() => Designation)
@Injectable()
export class DesignationResolver {
  constructor(private readonly designationService: DesignationService) {}
  @UseGuards(AuthGuard)
  @Mutation(() => Designation)
  createDesignation(
    @Args('createDesignationInput') createDesignationInput: CreateDesignation,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.designationService.createDesignation(
      createDesignationInput,
      userId,
    );
  }

  @Query(() => [Designation], { name: 'designations' })
  findAllCategory(@Args('page') page: number, @Args('limit') limit: number) {
    return this.designationService.getAllDesignations(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => Designation, { name: 'designation' })
  findDesignationById(@Args('id') id: string) {
    return this.designationService.getDesignationById(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Designation)
  updateDesignation(
    @Args('updateDesignationInput') updateDesignationInput: UpdateDesignation,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.designationService.updateDesignation(
      updateDesignationInput.id,
      updateDesignationInput,
      userId,
    );
  }

  // ✅ Delete a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Designation)
  deleteDesignation(@Args('id') id: number) {
    return this.designationService.deleteDesignation(id);
  }
}
