import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../../prisma/publish-type.enum';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@ObjectType()
export class News {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field()
  label: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  reporterName?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  thumbnail?: string;

  @Field(() => [Int], { nullable: true })
  isCopiedTo?: number[];

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isMarquee: keyof typeof YesOrNo;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApprovedByAdmin: keyof typeof YesOrNo;

  @Field(() => [NewsPhoto], { nullable: true })
  photos?: NewsPhoto[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}

@ObjectType()
export class NewsPhoto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  newsId: number;

  @Field({ middleware: [pathFinderMiddleware] })
  url: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
