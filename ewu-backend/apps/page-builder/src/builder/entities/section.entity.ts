import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Section {
  @Field(() => Int)
  id: number;

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
