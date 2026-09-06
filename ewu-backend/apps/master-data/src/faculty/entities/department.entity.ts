import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Department {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  mission?: string;

  @Field({ nullable: true })
  vision?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  facultyId: number;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  photoUrl?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isSubDepartment: keyof typeof YesOrNo;
}
