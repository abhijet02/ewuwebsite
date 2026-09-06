import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
import { Publish } from '../../prisma/publish-type.enum';

@ObjectType()
export class Slider {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field({ nullable: true })
  countDownLabel?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  sliderMediaUrl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  watermarkLogourl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  countDownLogo?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isWatermarkEnable: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isCountdownShow: keyof typeof YesOrNo;

  @Field({ nullable: true })
  countDownDate?: Date;

  @Field({ nullable: true })
  countDownTime?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBanner1Show: keyof typeof YesOrNo;

  @Field({ nullable: true })
  banner1label?: string;

  @Field({ nullable: true })
  banner1LogoLabel?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  banner1LogoUrl?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBanner2Show: keyof typeof YesOrNo;

  @Field({ nullable: true })
  banner2label?: string;

  @Field({ nullable: true })
  banner2LogoLabel?: string;
  
  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  banner2LogoUrl?: string;

  @Field({ nullable: true })
  overlayText?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
