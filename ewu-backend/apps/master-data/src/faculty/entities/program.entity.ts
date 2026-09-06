import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Program {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  facultyId?: number;

  @Field(() => Int)
  programCategoryId: number;

  @Field(() => Int)
  departmentId: number;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  programDetails?: string;
  
  @Field({ nullable: true })
  semester?: string;

  @Field(() => Date, { nullable: true })
  admissionDeadline: Date;
    
  @Field({ nullable: true })
  admissionDeadlineText?:string;

  @Field(() => Date, { nullable: true })
  dateOfaddissionTest: Date;

  @Field({ nullable: true })
  dateOfadmissionTestText?:string;

  @Field(() => Int)
  credit: number;

  @Field(() => Int)
  tutionfeePerCredit: number;

  @Field(() => Int)
  tutionfeeTotal: number;

  @Field(() => Int)
  labFee: number;

  @Field(() => Int)
  admissionFee: number;

  @Field({ nullable: true })
  termsAndCondition?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
