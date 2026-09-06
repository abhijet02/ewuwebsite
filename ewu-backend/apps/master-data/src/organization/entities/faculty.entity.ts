import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Faculty {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
