import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateAdmissionResultInput {
  @Field(() => Int)
  programCategoryId: number;

  @Field(() => Int)
  semesterId: number;

  @Field(()=> Int, {nullable: true})
  facultyId: number;

  @Field(() => Int)
  year: number;

  @Field()
  title: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'PDF or file upload for the admission result',
  })
  fileUrl?: Upload;

  @Field()
  publishDate: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isPublished: keyof typeof YesOrNo;
}

@InputType()
export class UpdateAdmissionResultInput extends PartialType(
  CreateAdmissionResultInput,
) {
  @Field(() => Int)
  id: number;
}
