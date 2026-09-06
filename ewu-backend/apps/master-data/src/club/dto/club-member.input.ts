import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateClubMemberInput {
  @Field()
  fullName: string;

  @Field({ nullable: true})
  slug?: string;

  @Field({ nullable: true})
  studentId?: string;

  @Field({ nullable: true})
  startdate?: Date;

  @Field({ nullable: true})
  endDate?: Date;

  @Field(() => Int)
  clubId: number;

  @Field({ nullable: true })
  designation?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the photoUrl Image.',
  })
  photoUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the cvUrl Image.',
  })
  cvUrl?: Upload;

   @Field(() => Upload, {
    nullable: true,
    description: 'Input for the signatureUrl Image.',
  })
  signatureUrl?: Upload;

  @Field({ nullable: true })
  youtubeLink?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  earnedCredit?: string;

  @Field({ nullable: true })
  semester?: string;

  @Field({ nullable: true })
  joiningSemeser?: string;

  @Field({ nullable: true })
  cgpa?: string;

  @Field({ nullable: true })
  bloodGroup?: string;

  @Field(() => [Int])
  skillId: number[];

  @Field({ nullable: true })
  achievements?: string;

  @Field({ nullable: true })
  hobby?: string;

  @Field({ nullable: true })
  classRoutine?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isExecutive: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isModerators: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApproved: keyof typeof YesOrNo;;
}

@InputType()
export class UpdateClubMemberInput extends PartialType(CreateClubMemberInput) {
  @Field(() => Int)
  id: number;
}
