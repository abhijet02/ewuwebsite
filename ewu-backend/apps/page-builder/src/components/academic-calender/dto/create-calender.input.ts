import { Field, Int, InputType } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateCalenderInput {
  @IsOptional()
  @Field({ nullable: true })
  date?: Date;


  @Field({ nullable: true })
  dateText?: string

  @IsOptional()
  @Field({ nullable: true })
  endDate?: Date; 

  @Field({ nullable: true })
  endDateText?: string; 

  @IsOptional()
  @Field({ nullable: true })
  day?: string;

  @IsOptional()
  @Field({ nullable: true })
  event?: string;

  @IsOptional()
  @Field({ nullable: true })
  classDays?: string;

  @IsOptional()
  @Field({ nullable: true })
  lastDateOfClass?: Date;

  @Field({ nullable: true })
  lastDateOfClassText?: string;

  @IsOptional()
  @Field({ nullable: true })
  finalExamDays?: string;

  @IsOptional()
  @Field({ nullable: true })
  finalExamDate?: Date;

  @Field({ nullable: true })
  finalExamDateText?: string;

  @Field({ nullable: true })
  description?: string;

   @Field(() => Publish, { defaultValue: Publish.NO })
    isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isImportantDate: keyof typeof YesOrNo;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  semesterId: number;

  @Field(() => Int)
  programId: number;
}
