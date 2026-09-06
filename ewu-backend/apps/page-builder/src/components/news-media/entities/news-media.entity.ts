import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../../prisma/publish-type.enum';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';


@ObjectType()
export class NewsMedia {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  label: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  date: Date;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  link?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;

  @Field(() => [NewsMediaFile], { nullable: true })
  files?: NewsMediaFile[];
}

@ObjectType()
export class NewsMediaFile {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  newsMediaId: number;

  @Field({ nullable: true })
  orgName?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  thumbNailUrl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  fileUrl?: string;

  @Field({ nullable: true })
  link?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
