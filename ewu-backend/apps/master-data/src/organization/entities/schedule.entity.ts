import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Schedule {
  @Field(() => Int)
  id: number;

  @Field()
  day: string;

  @Field(() => Int, { nullable: true })
  officeMemberId?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
