import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateProcurementInput {
  @Field()
  title: string;

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

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload procurement file (PDF, DOC, etc.)',
  })
  fileUrl?: Upload;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isPublished: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApplyThroughEtenderPortal: keyof typeof YesOrNo;

  @Field(() => [CreateProcurementNewsPaperDetailsInput],{nullable: true})
  procurementNewsPaperDetails?: CreateProcurementNewsPaperDetailsInput[]
}

@InputType()
export class CreateProcurementNewsPaperDetailsInput {
  @Field()
  name: string;

  @Field({ nullable: true})
  pageNo?: string;

  @Field({ nullable: true})
  link?: string;
}

@InputType()
export class UpdateProcurementInput extends PartialType(
  CreateProcurementInput,
) {
  @Field(() => Int)
  id: number;
}
