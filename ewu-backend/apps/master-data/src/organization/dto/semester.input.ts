import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateSemesterInput {
  @Field()
  title: string;

  @Field(() => Int)
  order: number;
}

@InputType()
export class UpdateSemesterInput extends PartialType(CreateSemesterInput) {
  @Field(() => Int)
  id: number;
}
