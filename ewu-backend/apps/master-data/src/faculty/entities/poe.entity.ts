import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Poe {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  departmentId: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  title: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
