import { InputType, Field,PartialType, Int } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class CreateYearlyViewInput {
  @Field(() => Int, {nullable: true})
  pageId?: number;
  
  @Field()
  year: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  subTitle?: string;

  @Field(() => Upload, { nullable: true })
  photoUrl?: Upload;

  @Field(() => Upload, { nullable: true })
  attachment1Url?: Upload;

  @Field({ nullable: true })
  attachment1Name?: string;

  @Field(() => Upload, { nullable: true })
  attachment2Url?: Upload;

  @Field(() => [CreateYearlyViewAttachmentInput], { nullable: true })
  yearlyViewAttachment?: CreateYearlyViewAttachmentInput[]

  @Field({ nullable: true })
  attachment2Name?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class CreateYearlyViewAttachmentInput {
  @Field(() => Upload, { nullable: true })
  attachmentUrl?: Upload;

  @Field({ nullable: true })
  attachmentName?: string;
}

@InputType()
export class UpdateYearlyViewInput extends PartialType(CreateYearlyViewInput) {
  @Field(() => Int)
  id: number;
}

