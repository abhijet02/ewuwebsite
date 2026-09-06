// create-gallery.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';
import {
  pathFinderMiddleware,
  pathFinderMiddlewareForArrayOfString,
} from 'middleware/pathFinderMiddleware';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateGalleryInput {
  @Field(() => Int)
  pageId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  year?: string;


  @Field(() => Int, { nullable: true, defaultValue: 0 })
  order?:number;  

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the MediaUrl.',
    middleware: [pathFinderMiddleware],
  })
  mediaUrl?: Upload;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => [Upload], {
    nullable: true,
    description: 'Input for the MediaUrl.',
    middleware: [pathFinderMiddlewareForArrayOfString],
  })
  galleryPhoto?: Upload[];
}
// update-gallery.input.ts

@InputType()
export class UpdateGalleryInput extends PartialType(CreateGalleryInput) {
  @Field(() => Int)
  id: number;
}
