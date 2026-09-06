import { InputType, Field, Int } from '@nestjs/graphql';
import { Upload } from '../../../../../../scalars/upload.scalar';
import {
  pathFinderMiddleware,
  pathFinderMiddlewareForArrayOfString,
} from 'middleware/pathFinderMiddleware';
import { Publish } from '../../../prisma/publish-type.enum';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateNewsInput {
  @Field(() => Int)
  pageId: number;

  @Field()
  label: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  reporterName?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the thumbnail files.',
    middleware: [pathFinderMiddleware],
  })
  thumbnail?: Upload;

  @Field(() => [Upload], {
    nullable: true,
    description: 'Input for the news photos files.',
    middleware: [pathFinderMiddlewareForArrayOfString],
  })
  photos?: Upload[];

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
