import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateEventInput } from './create-events.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => Int)
  id: number;
}
