import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateFooterInput {
  @Field(() => Int)
  pageId: number;

  @Field({ nullable: true })
  headerText?: string;

  @Field({ nullable: true })
  footerApplyNowText?: string;

  @Field({ nullable: true })
  footerApplyNowLink?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the footerLogoUrl Image.',
  })
  footerLogoUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the footerMediaUrl Image.',
  })
  footerMediaUrl?: Upload;

  @Field({ nullable: true })
  footerContactUsMobile?: string;

  @Field({ nullable: true })
  footerContactUsEmail?: string;

  @Field({ nullable: true })
  footerContactUsHotline?: string;

  @Field({ nullable: true })
  footerAddress?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the footerMap Image.',
  })
  footerMap?: Upload;

  @Field({ nullable: true })
  footerMapPath?: string

  @Field({ nullable: true })
  footerCopyRightTitle?: string;
}

@InputType()
export class UpdateFooterInput extends PartialType(CreateFooterInput) {
  @Field(() => Int)
  id: number;
}
