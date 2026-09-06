import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateComponentInput } from './create-component.input';

@InputType()
export class UpdateComponentInput extends PartialType(CreateComponentInput) {
  @Field(() => Int)
  id: number;
}
