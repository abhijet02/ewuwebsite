import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplication } from '../entities/job-application.entity';
import {
  CreateJobApplicationInput,
  UpdateJobApplicationInput,
} from '../dto/job-application.input';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => JobApplication)
export class JobApplicationResolver {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Mutation(() => JobApplication)
  createJobApplication(
    @Args('createJobApplicationInput')
    createJobApplicationInput: CreateJobApplicationInput,
  ) {
    return this.jobApplicationService.create(createJobApplicationInput);
  }

  @Query(() => [JobApplication], { name: 'jobApplications' })
  findAllApplications(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.jobApplicationService.findAll(page, limit);
  }

  @Query(() => JobApplication, { name: 'jobApplication' })
  findApplicationById(@Args('id', { type: () => Int }) id: number) {
    return this.jobApplicationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => JobApplication)
  updateApplication(
    @Args('updateJobApplicationInput')
    updateJobApplicationInput: UpdateJobApplicationInput,
  ) {
    return this.jobApplicationService.update(
      updateJobApplicationInput.id,
      updateJobApplicationInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => JobApplication)
  removeApplication(@Args('id', { type: () => Int }) id: number) {
    return this.jobApplicationService.remove(id);
  }
}
