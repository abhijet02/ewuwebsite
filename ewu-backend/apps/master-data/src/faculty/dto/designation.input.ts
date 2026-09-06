import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
@InputType()
export class CreateDesignation {
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
@InputType()
export class UpdateDesignation extends PartialType(CreateDesignation) {
  @Field(() => Int)
  id: number;
}
