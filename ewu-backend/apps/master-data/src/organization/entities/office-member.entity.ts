import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class OfficeMember {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  officeId: number;

  @Field(() => [Int])
  officeIds: number[];

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  name: string;

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

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  profilePhotoUrl?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  signatureUrl?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  cvUrl?: string;

  @Field({ nullable: true })
  location?: string;

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
