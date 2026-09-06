import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from '../../../../../../scalars/upload.scalar';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../../prisma/publish-type.enum';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';


@InputType()
export class CreateNewsMediaInput {
  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  label: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  description?: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Thumbnail file for the news media.',
    middleware: [pathFinderMiddleware],
  })
  thumbnail?: Upload;

  @Field({ nullable: true })
  link?: string;

  @Field(() => [CreateNewsMediaFileInput], { nullable: true })
  files?: CreateNewsMediaFileInput[];

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class CreateNewsMediaFileInput {
  @Field({ nullable: true })
  orgName?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  thumbNailUrl?: Upload;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  fileUrl?: Upload;

  @Field({ nullable: true })
  link?: string;
}

@InputType()
export class UpdateNewsMediaInput extends PartialType(CreateNewsMediaInput) {
  @Field(() => Int)
  id: number;
}
