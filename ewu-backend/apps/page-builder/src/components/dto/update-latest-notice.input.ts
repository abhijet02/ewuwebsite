import { CreateLatestNoticeInput } from './create-latest-notice.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLatestNoticeInput extends PartialType(
  CreateLatestNoticeInput,
) {
  @Field(() => Int)
  id: number;
}
