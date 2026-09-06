import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../prisma/publish-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@ObjectType()
export class Notice {
  @Field(() => Int)
  id: number;

  @Field()
  category: string;

  @Field()
  label: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field()
  date: Date;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  attachmentUrl?: string;

  @Field(() => [NoticePhoto], { nullable: true })
  photos?: NoticePhoto[];

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  thumbnail?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isMarquee: keyof typeof YesOrNo;

  @Field(() => [Int], { nullable: true })
  isCopiedTo?: number[];

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApprovedByAdmin: keyof typeof YesOrNo;

  @Field({ nullable: true })
  location?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field()
  pageId: number;

  @Field({ nullable: true })
  sub_category?: string;

  @Field({ nullable: true })
  author?: string;
}

@ObjectType()
export class NoticePhoto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  noticeId: number;

  @Field({ nullable: true })
  fileName?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  url?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
