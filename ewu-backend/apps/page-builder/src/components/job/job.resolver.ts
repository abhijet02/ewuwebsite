import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { JobService } from './job.service';
import { Job } from '../entities/job.entity';
import { CreateJobInput, UpdateJobInput } from '../dto/job.input';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Job)
  createJob(
    @Args('createJobInput') createJobInput: CreateJobInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.jobService.create(createJobInput, userId);
  }

  @Query(() => [Job], { name: 'jobs' })
  findAllJobs(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.jobService.findAll(page, limit);
  }

  @Query(() => Job, { name: 'job' })
  findJobById(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Job)
  updateJob(
    @Args('updateJobInput') updateJobInput: UpdateJobInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.jobService.update(updateJobInput.id, updateJobInput, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Job)
  removeJob(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.remove(id);
  }
}
