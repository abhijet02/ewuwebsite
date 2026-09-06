import { InputType, Field,PartialType } from '@nestjs/graphql';
import { CreateCategory } from './create-category.input';
@InputType()
export class UpdateCategory extends PartialType(CreateCategory)  {
  @Field()
  id: number;
}