import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateFeedbackOfStudentInput } from './create-feedback-of-student.input';

@InputType()
export class UpdateFeedbackOfStudentInput extends PartialType(
  CreateFeedbackOfStudentInput,
) {
  @Field(() => Int)
  id: number;
}
