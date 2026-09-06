import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { FeedbackOfStudent } from './entities/feedback-of-student.entity';
import { CreateFeedbackOfStudentInput } from './dto/create-feedback-of-student.input';
import { UpdateFeedbackOfStudentInput } from './dto/update-feedback-f-student.input';
import { FeedbackOfStudentService } from './feedback-of-student.service';

@Resolver(() => FeedbackOfStudent)
export class FeedbackOfStudentResolver {
  constructor(
    private readonly feedbackOfStudentService: FeedbackOfStudentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => FeedbackOfStudent)
  createFeedbackOfStudent(
    @Args('createFeedbackOfStudentInput')
    createFeedbackOfStudentInput: CreateFeedbackOfStudentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.feedbackOfStudentService.create(
      createFeedbackOfStudentInput,
      userId,
    );
  }

  @Query(() => [FeedbackOfStudent], { name: 'allfeedbackOfStudent' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.feedbackOfStudentService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => FeedbackOfStudent, { name: 'feedbackOfStudent' })
  findById(@Args('id') id: string) {
    return this.feedbackOfStudentService.findOne(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => FeedbackOfStudent)
  updateFeedbackOfStudent(
    @Args('updateFeedbackOfStudentInput')
    updateFeedbackOfStudentInput: UpdateFeedbackOfStudentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.feedbackOfStudentService.update(
      updateFeedbackOfStudentInput.id,
      updateFeedbackOfStudentInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FeedbackOfStudent)
  async removeFeedbackOfStudent(@Args('id') id: number) {
    return this.feedbackOfStudentService.delete(id);
  }
}
