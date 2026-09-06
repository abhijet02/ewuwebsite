import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class SemesterCalender {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  shortNote?: string;

  @Field()
  label: string;

  @Field(() => Int, { nullable: true })
  order?: number

  @Field({ nullable: true })
  description?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBiSemester: keyof typeof YesOrNo;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachmentUrl?: string;

  @Field(() => Int)
  programId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
