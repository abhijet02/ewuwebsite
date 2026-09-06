import { Field, Int, InputType } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateSemesterCalenderInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  shortNote?: string;

  @Field()
  label: string;

  @Field(() => Int, { nullable: true })
  order?: number

  @Field({ nullable: true })
  description?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBiSemester: keyof typeof YesOrNo;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the attachmentUrl Image.',
  })
  attachmentUrl: Upload;

  @Field(() => Int)
  programId: number;
}
