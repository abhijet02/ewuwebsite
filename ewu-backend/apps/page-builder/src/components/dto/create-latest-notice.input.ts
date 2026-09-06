import { InputType, Field, Int } from '@nestjs/graphql';
import { Upload } from '../../../../../scalars/upload.scalar';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../prisma/publish-type.enum';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@InputType()
export class CreateLatestNoticeInput {
  @Field()
  category: string;

  @Field()
  label: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field()
  date: Date;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the attachment files.',
    middleware: [pathFinderMiddleware],
  })
  attachmentUrl?: Upload;

  @Field(() => [CreateLatestNoticePhotoInput], {
    nullable: true,
  })
  photos?: CreateLatestNoticePhotoInput[];

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the Thumbnail files.',
    middleware: [pathFinderMiddleware],
  })
  thumbnail?: Upload;

  @Field()
  pageId: number;

  @Field({ nullable: true })
  sub_category?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  author?: string;

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
}

@InputType()
export class CreateLatestNoticePhotoInput {
  @Field({ nullable: true })
  fileName?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the attachment files.',
    middleware: [pathFinderMiddleware],
  })
  url?: Upload;
}
