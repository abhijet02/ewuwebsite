import { CreateAccordionInput } from 'apps/page-builder/src/components/dto/accordion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminMenuInput extends PartialType(CreateAccordionInput) {
  @Field(() => Int)
  id: number;
}