import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';

@ObjectType()
export class SearchCourseCard {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  subTitle?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  logoLink?: string;

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
