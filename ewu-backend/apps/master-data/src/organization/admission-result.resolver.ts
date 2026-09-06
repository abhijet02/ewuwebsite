import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AdmissionResultService } from './admission-result.service';
import { AdmissionResult } from './entities/admission-result.entity';
import {
  CreateAdmissionResultInput,
  UpdateAdmissionResultInput,
} from './dto/admission-result.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => AdmissionResult)
export class AdmissionResultResolver {
  constructor(private readonly service: AdmissionResultService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => AdmissionResult)
  async createAdmissionResult(
    @Args('input') input: CreateAdmissionResultInput,
    @Context() context,
  ) {
    const userId = context?.user?.id;
    return this.service.create(input, userId);
  }

  @Query(() => [AdmissionResult], { name: 'admissionResults' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => AdmissionResult, { name: 'admissionResult' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdmissionResult)
  async updateAdmissionResult(
    @Args('input') input: UpdateAdmissionResultInput,
    @Context() context,
  ) {
    const userId = context?.user?.id;
    return this.service.update(input.id, input, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AdmissionResult)
  removeAdmissionResult(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
