import { Field, Int, InputType } from '@nestjs/graphql';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
import { Publish } from '../../prisma/publish-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateSliderInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the sliderMediaUrl Image.',
  })
  sliderMediaUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the watermarkLogourl Image.',
  })
  watermarkLogourl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the count-Down Logo Image.',
  })
  countDownLogo?: Upload;

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

  @Field({ nullable: true })
  countDownLabel?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBanner1Show: keyof typeof YesOrNo;

  @Field({ nullable: true })
  banner1label?: string;

  @Field({ nullable: true })
  banner1LogoLabel?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the count-Down Logo Image.',
  })
  banner1LogoUrl?: Upload;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBanner2Show: keyof typeof YesOrNo;

  @Field({ nullable: true })
  banner2label?: string;

  @Field({ nullable: true })
  banner2LogoLabel?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the count-Down Logo Image.',
  })
  banner2LogoUrl?: Upload;

  @Field({ nullable: true })
  overlayText?: string;
}
