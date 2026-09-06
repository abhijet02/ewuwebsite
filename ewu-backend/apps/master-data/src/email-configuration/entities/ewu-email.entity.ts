import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EwuEmail {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  componentId?: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field(() => Int, { nullable: true })
  clubId?: number;

  @Field(() => [String])
  email: string[];

  @Field()
  emailSubject: string;

  @Field()
  emailBody: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
