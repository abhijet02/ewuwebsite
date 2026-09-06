import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateFacultyMemberDocumentInput {
  @Field(() => Int)
  facultyId: number;

  @Field({ nullable: true })
  fileName?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the document file.',
  })
  filePath?: Upload;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isCertificate: keyof typeof YesOrNo;

  @Field(() => Int, { defaultValue: 0 })
  order: number;
}

@InputType()
export class UpdateFacultyMemberDocumentInput extends PartialType(
  CreateFacultyMemberDocumentInput,
) {
  @Field(() => Int)
  id: number;
}
