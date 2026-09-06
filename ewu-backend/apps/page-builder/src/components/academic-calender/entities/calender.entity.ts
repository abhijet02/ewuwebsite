import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../../prisma/publish-type.enum';
import { YesOrNo } from '../../../prisma/yes-or-no-type.enum';

@ObjectType()
export class Calender {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  dateText?: string;
  
  @Field({ nullable: true })
  endDate?: Date; 

  @Field({ nullable: true })
  endDateText?: string; 

  @Field({ nullable: true })
  day?: string;

  @Field({ nullable: true })
  event?: string;

  @Field({ nullable: true })
  classDays?: string;

  @Field({ nullable: true })
  lastDateOfClass?: Date;

  @Field({ nullable: true })
  lastDateOfClassText?: string;

  @Field({ nullable: true })
  finalExamDays?: string;

  @Field({ nullable: true })
  finalExamDate?: Date;

  @Field({ nullable: true })
  finalExamDateText?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  programId: number;

  @Field(() => Int)
  semesterId: number;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isImportantDate: keyof typeof YesOrNo;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
