import { CreatefacultyInput } from './create-faculty.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFacultyInput extends PartialType(CreatefacultyInput) {
  @Field(() => Int)
  id: number;
}
