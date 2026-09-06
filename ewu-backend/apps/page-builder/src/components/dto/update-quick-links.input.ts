import { InputType, Field,PartialType } from '@nestjs/graphql';
import { CreateQuickLinksInput } from './create-quick-links.input';
@InputType()
export class UpdateQuickLinksInput extends PartialType(CreateQuickLinksInput)  {
  @Field()
  id: number;
}