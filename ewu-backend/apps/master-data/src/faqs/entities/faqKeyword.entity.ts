import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FaqKeyword {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}