import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Patnership } from './entities/patnership.entity';
import { PatnershipService } from './patnership.service';
import { CreatePatnershipInput } from './dto/create-patnership.input';
import { UpdatePatnershipInput } from './dto/update-patnership.input';

@Resolver(() => Patnership)
export class PatnershipResolver {
  constructor(private readonly patnershipService: PatnershipService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Patnership)
  createPatnership(
    @Args('createPatnershipInput') createPatnershipInput: CreatePatnershipInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.patnershipService.create(createPatnershipInput, userId);
  }

  @Query(() => [Patnership], { name: 'patnerships' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.patnershipService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => Patnership, { name: 'patnership' })
  findById(@Args('id') id: string) {
    return this.patnershipService.findOne(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Patnership)
  updatePatnership(
    @Args('updatePatnershipInput') updatePatnershipInput: UpdatePatnershipInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.patnershipService.update(
      updatePatnershipInput.id,
      updatePatnershipInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Patnership)
  async removePatnership(@Args('id') id: number) {
    return this.patnershipService.remove(id);
  }
}
