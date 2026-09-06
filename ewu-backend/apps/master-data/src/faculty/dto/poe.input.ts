import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreatePoeInput {
  @Field(() => Int)
  departmentId: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  title: string;
}

@InputType()
export class UpdatePoeInput extends PartialType(CreatePoeInput) {
  @Field(() => Int)
  id: number;
}

