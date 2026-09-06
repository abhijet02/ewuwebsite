import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class AdmissionResult {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  programCategoryId: number;

  @Field(() => Int)
  semesterId: number;

  @Field(()=> Int, {nullable: true})
  facultyId: number;

  @Field(() => Int)
  year: number;

  @Field()
  title: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  fileUrl?: string;

  @Field()
  publishDate: string;

  @Field(() => YesOrNo)
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo)
  isPublished: keyof typeof YesOrNo;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
