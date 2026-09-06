import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../prisma/publish-type.enum';
import { JobType } from '../../prisma/job-type.enum';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Job {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field(() => Int, { defaultValue: 0})
  order: number;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true})
  numberOfVacancy: number;

  @Field({ nullable: true })
  designation?: string;
  
  @Field(()=> Int, {nullable: true})
  ageLimit?: number;

  @Field({ nullable: true})
  ageLimitDate?: Date;
  

  @Field(() => Int, { nullable: true })
  officeId?: number;

  @Field(() => Int, { nullable: true })
  departmentId?: number;

  @Field(() => Int, { nullable: true })
  facultyId?: number;

  @Field()
  date: Date;

  @Field()
  deadline: Date;

  @Field({ nullable: true })
  jobDescription?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  jobCircularUrl?: string;


  @Field(() => JobType, { nullable: true, defaultValue: JobType.FULLTIME })
  jobtype?: keyof typeof JobType;

  @Field({ nullable: true })
  fbLink?: string;

  @Field({ nullable: true })
  xLink?: string;

  @Field({ nullable: true })
  inLink?: string;

  @Field()
  email: string;

  @Field()
  exeperience: string;

  @Field()
  education: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApplyNowShow: keyof typeof YesOrNo;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
