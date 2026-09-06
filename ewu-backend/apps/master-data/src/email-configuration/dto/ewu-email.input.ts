import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateEwuEmailInput {
  @Field(() => Int, { nullable: true })
  componentId?: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field(() => Int, { nullable: true })
  clubId?: number;

  @Field(() => [String])
  email: string[];

  @Field()
  emailSubject: string;

  @Field()
  emailBody: string;
}

@InputType()
export class UpdateEwuEmailInput extends PartialType(CreateEwuEmailInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
