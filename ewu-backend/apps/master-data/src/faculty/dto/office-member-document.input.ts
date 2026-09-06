import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateOfficeMemberDocumentInput {
  @Field(() => Int)
  officeId: number;

  @Field({ nullable: true })
  fileName?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isCertificate: keyof typeof YesOrNo;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the document file.',
  })
  filePath?: Upload;

  @Field(() => Int, { defaultValue: 0 })
  order: number;
}

@InputType()
export class UpdateOfficeMemberDocumentInput extends PartialType(
  CreateOfficeMemberDocumentInput,
) {
  @Field(() => Int)
  id: number;
}
