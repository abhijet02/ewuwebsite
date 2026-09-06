import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSectionInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => Int)
  secetionOrder: number;

  @Field({ nullable: true })
  sectionTitle?: string;

  @Field({ nullable: true })
  sectionSubTitle?: string;

  @Field({ nullable: true })
  sectionBackgroundColor?: string;

  @Field({ nullable: true })
  columRatio?: string;

  @Field(() => Int)
  columnOrder: number;

  @Field(() => Int)
  componentId: number;
}
