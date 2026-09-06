import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
@ObjectType()
export class Designation {
  @Field(() => Int)
  id: number;

  @Field()
  designation: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isClub: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isOffice: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isfaculty: keyof typeof YesOrNo;

  @Field(() => Int)
  order: number;
}