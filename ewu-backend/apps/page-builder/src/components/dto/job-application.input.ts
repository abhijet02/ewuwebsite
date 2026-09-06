import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Publish } from '../../prisma/publish-type.enum';
import { Upload } from 'scalars/upload.scalar';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@InputType()
export class CreateJobApplicationInput {
  @Field(() => Int)
  jobId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  designation?: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  dob?:Date;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  coverLetter?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload the CV file.',
  })
  cvUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload the cover letter file.',
  })
  coverLetterUrl?: Upload;

   @Field(() => Upload, {
    nullable: true,
    description: 'Upload the attachment file.',
  })
  attachmentUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload the photo file.',
  })
  photoUrl?: Upload;
  

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

    @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
    isChecked: keyof typeof YesOrNo;
}
@InputType()
export class UpdateJobApplicationInput extends PartialType(CreateJobApplicationInput) {
  @Field(() => Int)
  id: number;
}