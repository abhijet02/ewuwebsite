import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateQuote {
  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  quote: string;

  @Field()
  designation: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  url?: string;

  @Field(() => Upload, {
    nullable: true,
    middleware: [pathFinderMiddleware],
    description: 'Input for the imageUrl Image.',
  })
  imageUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the nextThumbnailUrl Image.',
  })
  nextThumbnailUrl?: Upload;
}

@InputType()
export class UpdateQuote extends PartialType(CreateQuote) {
  @Field(() => Int)
  id: number;
}
