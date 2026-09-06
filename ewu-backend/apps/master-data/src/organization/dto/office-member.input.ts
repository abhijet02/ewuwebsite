import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { IsEmail } from 'class-validator';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateOfficeMemberInput {
  @Field(() => Int)
  officeId: number;

  @Field(() => [Int])
  officeIds: number[];

  @Field(() => Int)
  order: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  designation: string;

  @Field({nullable: true})
  designationText?: string;

  @Field({ nullable: true })
  dateOfJoining?: Date;

  @Field({ nullable: true })
  jobType?: string;

  @Field({ nullable: true })
  telephone?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the profilePhotoUrl image.',
  })
  profilePhotoUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the signatureUrl image.',
  })
  signatureUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the cvUrl image.',
  })
  cvUrl?: Upload;


  @Field({ nullable: true })
  location?: string;

  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  ext?: string;

  @Field({ nullable: true })
  fbLink?: string;

  @Field({ nullable: true })
  xLink?: string;

  @Field({ nullable: true })
  youtubeLink?: string;

  @Field({ nullable: true })
  linkedInLink?: string;
  
  @Field({ nullable: true })
  githubLink?: string;

  @Field({ nullable: true })
  portfolioLink?: string;
  
  @Field({ nullable: true })
  pinterestLink?: string;

  @Field({ nullable: true })
  instagramLink?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  previousWorkExperience?: string;

  @Field({ nullable: true })
  educationDescription?: string;

  @Field({ nullable: true })
  careerDescription?: string;

  @Field({ nullable: true })
  onLeaveText?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  onLeave: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isPublished: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isheadOfOffice: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isMember: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBoT: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isOfficeMember: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isProctor: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isAssProctor: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isSupportMember: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isMemberSecretary: keyof typeof YesOrNo;
}

@InputType()
export class UpdateOfficeMemberInput extends PartialType(
  CreateOfficeMemberInput,
) {
  @Field(() => Int)
  id: number;
}
