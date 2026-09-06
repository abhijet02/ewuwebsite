import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Faculty } from '../../organization/entities/faculty.entity';
import { Department } from './department.entity';
import { Course } from './course.entity';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@ObjectType()
export class FacultyPerson {
  @Field(() => Int)
  id: number;

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
  isDean: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBoT: keyof typeof YesOrNo;
  
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

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  photo?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  signatureUrl?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  cvUrl?: string;
  
  
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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;

  // Relationships
  @Field(() => Faculty)
  faculty?: Faculty;

  @Field(() => Department)
  department?: Department;

  @Field(() => Course, { nullable: true })
  course?: Course;
}
