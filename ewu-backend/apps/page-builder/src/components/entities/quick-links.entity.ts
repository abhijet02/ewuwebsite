import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class QuickLinks {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field()
  url: string;

  @Field()
  category: string;

  @Field()
  createdAt: Date;
  
  @Field({ nullable: true })
  updateAt?: Date;
}