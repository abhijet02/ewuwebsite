import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@ObjectType()
export class Builder {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isLatestNewsEnable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isHeaderEnable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isHeader2Enable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isHeader3Enable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isClubHeaderEnable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isSliderEnable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isFooterEnable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isFooter2Enable: keyof typeof YesOrNo;
  
  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isFooter3Enable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isClubFooterEnable: keyof typeof YesOrNo;
  
  @Field(() => Int)
  sectionCount: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}

