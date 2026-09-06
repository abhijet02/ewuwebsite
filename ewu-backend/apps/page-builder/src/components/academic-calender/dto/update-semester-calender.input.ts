import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateSemesterCalenderInput } from './create-semester-calender.input';

@InputType()
export class UpdateSemesterCalenderInput extends PartialType(
  CreateSemesterCalenderInput,
) {
  @Field(() => Int)
  id: number;
}
