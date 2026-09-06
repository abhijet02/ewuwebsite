import { InputType, Int, Field } from '@nestjs/graphql';
import { Upload } from '../../../../../scalars/upload.scalar';
import { Publish } from '../../prisma/publish-type.enum';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@InputType()
export class CreateEventInput {
  @Field(() => Int)
  pageId: number;

  @Field()
  category: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field()
  fromDate: Date;

  @Field({ nullable: true })
  toDate?: Date;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the attachment files.',
    middleware: [pathFinderMiddleware]
  })
  attachmentUrl?: Upload;

  @Field({ nullable: true })
  attachmentName?: string;

  @Field(() => [Int], { nullable: true })
  isCopiedTo?: number[];

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isMarquee: keyof typeof YesOrNo;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApprovedByAdmin: keyof typeof YesOrNo;

  @Field(() => [CreateEventSpeakerInput], { nullable: true })
  eventSpeaker?: CreateEventSpeakerInput[];

  @Field(() => [CreateEventAttachmentInput], { nullable: true })
  attachments?: CreateEventAttachmentInput[];
}

@InputType()
export class CreateEventSpeakerInput {

  @Field()
  name: string

  @Field({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  companyName?: string;

  @Field(() => Upload, { nullable: true, middleware: [pathFinderMiddleware] })
  photoUrl?: Upload;
}

@InputType()
export class CreateEventAttachmentInput {
  @Field(() => Upload, { nullable: true, middleware: [pathFinderMiddleware] })
  attachmentUrl?: Upload;

  @Field({ nullable: true })
  attachmentName?: string;
}