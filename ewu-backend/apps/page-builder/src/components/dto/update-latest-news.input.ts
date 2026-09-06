import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateLatestNewsInput } from './create-latest-news.input';

@InputType()
export class UpdateLatestNewsInput extends PartialType(CreateLatestNewsInput) {
  @Field(() => Int)
  id: number;
}
