import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateHeaderInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the headerLogoUrl Image.',
  })
  headerLogoUrl?: Upload;

  @Field({ nullable: true })
  headerLogoLink?: string;

  @Field({ nullable: true })
  megamenuTitle?: string;

  @Field({ nullable: true })
  megaMenuBtn1Title?: string;

  @Field({ nullable: true })
  megaMenuBtn1Link?: string;

  @Field({ nullable: true })
  megaMenuBtn2Title?: string;

  @Field({ nullable: true })
  megaMenuBtn2Link?: string;

  @Field({ nullable: true })
  megaMenuBtn3Title?: string;

  @Field({ nullable: true })
  megaMenuBtn3Link?: string;
}

@InputType()
export class UpdateHeaderInput extends PartialType(CreateHeaderInput) {
  @Field(() => Int)
  id: number;
}
