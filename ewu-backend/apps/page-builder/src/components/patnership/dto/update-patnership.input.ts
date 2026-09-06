import { InputType, Field,PartialType } from '@nestjs/graphql';
import { CreatePatnershipInput } from './create-patnership.input';
@InputType()
export class UpdatePatnershipInput extends PartialType(CreatePatnershipInput)  {
  @Field()
  id: number;
}