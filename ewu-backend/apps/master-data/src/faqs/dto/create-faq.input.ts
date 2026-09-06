import { InputType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateFaqInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  keywordId: number;

  @Field()
  title: string;

  @Field()
  answer: string;

  @Field({ nullable: true})
  link?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isPublished: keyof typeof YesOrNo;
}
