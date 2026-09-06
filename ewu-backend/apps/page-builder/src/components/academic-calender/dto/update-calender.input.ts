import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCalenderInput } from './create-calender.input';

@InputType()
export class UpdateCalenderInput extends PartialType(CreateCalenderInput) {
  @Field(() => Int)
  id: number;
}