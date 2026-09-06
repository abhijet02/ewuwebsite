import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Procurement {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  fileUrl?: string;

  @Field()
  publishDate: string;

  @Field({ nullable: true})
  closingDate?: Date;

  @Field({ nullable: true})
  department?: string;

  @Field({ nullable: true})
  category?: string;

  @Field({ nullable: true})
  priceOfTender?: string;

  @Field({ nullable: true})
  description?: string;

  @Field({ nullable: true})
  tenderOpeningLocation?: string;

  @Field({ nullable: true})
  tenderOpeningDateTime?: Date;


  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isPublished: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApplyThroughEtenderPortal: keyof typeof YesOrNo;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;

  @Field(() => [ProcurementNewsPaperDetails],{nullable: true})
  procurementNewsPaperDetails?: ProcurementNewsPaperDetails[]
}
@ObjectType()
export class ProcurementNewsPaperDetails {
  @Field(() => Int)
  id: number;
  
  @Field(() => Int)
  procurementId: number;

  @Field()
  name: string;

  @Field({ nullable: true})
  pageNo?: string;

  @Field({ nullable: true})
  link?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
