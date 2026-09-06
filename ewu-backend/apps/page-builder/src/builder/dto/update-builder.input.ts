import { CreateBuilderInput } from './create-builder.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBuilderInput extends PartialType(CreateBuilderInput) {
  @Field(() => Int)
  id: number;
}
