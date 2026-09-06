import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../prisma/publish-type.enum';

@ObjectType()
export class YearlyViewComponent {
  @Field(() => Int)
  id: number;

  @Field(() => Int, {nullable: true})
  pageId?: number;

  @Field()
  date: Date;

  @Field()
  year: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  subTitle?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  photoUrl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachment1Url?: string;

  @Field({ nullable: true })
  attachment1Name?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachment2Url?: string;

  @Field({ nullable: true })
  attachment2Name?: string;

  @Field(() => [YearlyViewAttachment], { nullable: true })
  yearlyViewAttachment?: YearlyViewAttachment[];

  @Field(() => Publish)
  isPublished: keyof typeof Publish;

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
export class YearlyViewAttachment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  yearlyViewId: number;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachmentUrl?: string;

  @Field({ nullable: true })
  attachmentName?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
