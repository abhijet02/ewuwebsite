import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateFacultypersonInput {
  @Field(() => Int)
  facultyId: number;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int, { nullable: true })
  departmentId?: number;

  @Field(() => Int, { nullable: true })
  courseId?: number;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isPublished: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBoT: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isDean: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isChairperson: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isCoordinator: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isAdjunct: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isProctor: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isAssProctor: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isAdvisor: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  onLeave: keyof typeof YesOrNo;

  @Field()
  designation: string;

  @Field({nullable: true})
  designationText?: string;

  @Field()
  name: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the Photo Image.',
  })
  photo?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the Photo Image.',
  })
  signatureUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the Photo Image.',
  })
  cvUrl?: Upload;

  @Field({ nullable: true })
  onLeaveText?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  roomNo?: string;

  @Field({ nullable: true })
  jobType?: string;

  @Field({ nullable: true })
  dateOfJoining?: Date;

  @Field({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  eduDetails?: string;

  @Field({ nullable: true })
  publications?: string;

  @Field({ nullable: true })
  onGoingResearch?: string;

  @Field({ nullable: true })
  achievements?: string;

  @Field({ nullable: true })
  participations?: string;

  @Field({ nullable: true })
  researchInterest?: string;
  
  @Field({ nullable: true })
  teachingMaterials?: string;
  
  @Field({ nullable: true })
  affiliation?: string;

  @Field({ nullable: true })
  profDev?: string;

  @Field({ nullable: true })
  others?: string;

  @Field({ nullable: true })
  telephone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  ext?: string;

  @Field({ nullable: true })
  gsLink?: string;

  @Field({ nullable: true })
  orcidLink?: string;
  
  @Field({ nullable: true })
  researchGateLink?: string;

  @Field({ nullable: true })
  scopusLink?: string;

  @Field({ nullable: true })
  liLink?: string;

  @Field({ nullable: true })
  fbLink?: string;

  @Field({ nullable: true })
  instaLink?: string;

  @Field({ nullable: true })
  xLink?: string;

  @Field(() => Int)
  order: number;
}

@InputType()
export class UpdateFacultypersonInput extends PartialType(
  CreateFacultypersonInput,
) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  updatedBy?: number; // Add updatedBy field
}
