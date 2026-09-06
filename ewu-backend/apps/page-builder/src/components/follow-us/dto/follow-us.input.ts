import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';

@InputType()
export class CreateFollowUsInput {
  @Field(()=> Int, { defaultValue: 0})
  order: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  logoLink?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class UpdateFollowUsInput extends PartialType(CreateFollowUsInput) {
  @Field(() => Int)
  id: number;
}

