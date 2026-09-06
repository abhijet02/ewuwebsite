import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateProgramCategoryInput {
  @Field()
  title: string;

  @Field(() => Int)
  order: number;

  @Field({nullable: true})
  programDetails?: string;
}

@InputType()
export class UpdateProgramCategoryInput extends PartialType(
  CreateProgramCategoryInput,
) {
  @Field(() => Int)
  id: number;
}
