import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFaqKeywordInput {
  @Field()
  label: string;
}
