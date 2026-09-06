import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateOfficeDocumentInput {
  @Field(() => Int)
  officeId: number;

  @Field({ nullable: true })
  fileName?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the document file.',
  })
  fileUrl?: Upload;

  @Field({ nullable: true })
  link?: string;

  @Field(() => Int, { defaultValue: 0 })
  order: number;
}

@InputType()
export class UpdateOfficeDocumentInput extends PartialType(
  CreateOfficeDocumentInput,
) {
  @Field(() => Int)
  id: number;
}
