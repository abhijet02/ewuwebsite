import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';

@InputType()
export class CreateSuccessCardInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  countLabel?: string;

  @Field({ nullable: true })
  logoLink?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class UpdateSuccessCardInput extends PartialType(
  CreateSuccessCardInput,
) {
  @Field(() => Int)
  id: number;
}
