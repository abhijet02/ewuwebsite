import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';


@ObjectType()
export class LiveSession {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  platform?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  expiryDate?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
