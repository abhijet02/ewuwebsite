// create-gallery.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateCampusLifeInput {
  @Field(() => Int)
  pageId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  link?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the MediaUrl.',
  })
  mediaUrl?: Upload;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}
// update-gallery.input.ts

@InputType()
export class UpdateCampusLifeInput extends PartialType(CreateCampusLifeInput) {
  @Field(() => Int)
  id: number;
}
