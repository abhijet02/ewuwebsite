// news-media-org/dto/create-news-media-org.input.ts
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateNewsMediaOrgInput {
  @Field(() => Int, { nullable: true })
  newsMediaId?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  link?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Thumbnail file for the news media.',
    middleware: [pathFinderMiddleware],
  })
  thumbnail?: Upload;
}

@InputType()
export class UpdateNewsMediaOrgInput extends PartialType(
  CreateNewsMediaOrgInput,
) {
  @Field(() => Int)
  id: number;
}
