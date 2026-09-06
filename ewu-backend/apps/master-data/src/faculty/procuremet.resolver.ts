import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { ProcurementService } from './procurement.service';
import { Procurement } from './entities/procurement.entity';
import {
  CreateProcurementInput,
  UpdateProcurementInput,
} from './dto/procurement.input';

@Resolver(() => Procurement)
export class ProcurementResolver {
  constructor(private readonly procurementService: ProcurementService) {}

  // Fetch all procurements with pagination
  @Query(() => [Procurement], { name: 'procurements' })
  async getProcurements(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<Procurement[]> {
    return this.procurementService.findAll(page, limit);
  }

  // Fetch single procurement by ID
  @Query(() => Procurement, { name: 'procurement' })
  async getProcurement(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Procurement> {
    return this.procurementService.findOne(id);
  }

  // Create a new procurement
  @UseGuards(AuthGuard)
  @Mutation(() => Procurement)
  async createProcurement(
    @Args('createProcurementInput') createInput: CreateProcurementInput,
    @Context() ctx,
  ): Promise<Procurement> {
    const userId = ctx.user.id;
    return this.procurementService.create(createInput, userId);
  }

  // Update procurement
  @UseGuards(AuthGuard)
  @Mutation(() => Procurement)
  async updateProcurement(
    @Args('updateProcurementInput') updateInput: UpdateProcurementInput,
    @Context() ctx,
  ): Promise<Procurement> {
    const userId = ctx.user.id;
    return this.procurementService.update(updateInput.id, updateInput, userId);
  }

  // Delete procurement
  @UseGuards(AuthGuard)
  @Mutation(() => Procurement)
  async removeProcurement(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Procurement> {
    return this.procurementService.remove(id);
  }
}
