import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Semester {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  order: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
