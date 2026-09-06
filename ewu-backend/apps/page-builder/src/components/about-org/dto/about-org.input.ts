import { Field, Int, InputType, PartialType } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateAboutOrgInput {
  @Field({ nullable: true })
  sectionTitle?: string;

  @Field({ nullable: true })
  sectionSubTitle?: string;

  @Field({ nullable: true })
  aboutUstitle?: string;

  @Field({ nullable: true })
  aboutUs?: string;

  @Field({ nullable: true })
  missionTitle?: string;

  @Field({ nullable: true })
  mission?: string;

  @Field({ nullable: true })
  visionTitle?: string;

  @Field({ nullable: true })
  vision?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload for mediaUrl image.',
  })
  mediaUrl?: Upload;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class UpdateAboutOrgInput extends PartialType(CreateAboutOrgInput) {
  @Field(() => Int)
  id: number;
}
