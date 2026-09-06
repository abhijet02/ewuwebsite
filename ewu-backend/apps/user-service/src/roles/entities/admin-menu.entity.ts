import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AdminMenu {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  link: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
