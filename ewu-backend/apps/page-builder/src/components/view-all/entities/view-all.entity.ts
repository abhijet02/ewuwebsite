import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ViewAll {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  componentId: number;

  @Field(() => Int)
  pageId: number;

  @Field()
  viewAllLink: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}