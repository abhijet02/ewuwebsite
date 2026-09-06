import { CreateFaqKeywordInput } from './create-faq-keyword.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFaqKeywordInput extends PartialType(CreateFaqKeywordInput) {
  @Field(() => Int)
  id: number;
}
