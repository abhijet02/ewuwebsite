import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@ObjectType()
export class OfficeMemberDocument {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  officeId: number;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  fileName?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  filePath?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isCertificate: keyof typeof YesOrNo;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
