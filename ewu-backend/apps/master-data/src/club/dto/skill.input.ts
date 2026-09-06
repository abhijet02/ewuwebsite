import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateSkillInput {
  @Field(() => Int)
  clubId: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  @Field(() => Int)
  id: number;
}
