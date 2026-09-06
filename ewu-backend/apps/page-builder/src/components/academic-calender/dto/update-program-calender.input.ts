import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateProgramCalenderInput } from './create-program-calender.input';

@InputType()
export class UpdateProgramCalenderInput extends PartialType(
  CreateProgramCalenderInput,
) {
  @Field(() => Int)
  id: number;
}
