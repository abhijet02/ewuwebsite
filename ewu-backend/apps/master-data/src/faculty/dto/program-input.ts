import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateProgramInput {
  @Field()
  title: string;

  @Field(() => Int)
  programCategoryId: number;

  @Field(() => Int)
  departmentId: number;

  @Field(() => Int, { nullable: true })
  facultyId?: number;

  @Field(() => Int)
  order: number;

  @IsOptional()
  @Field({ nullable: true })
  programDetails?: string;

  @IsOptional()
  @Field({ nullable: true })
  semester?: string;

  @IsOptional()
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
}

@InputType()
export class UpdateProgramInput extends PartialType(CreateProgramInput) {
  @Field(() => Int)
  id: number;
}
