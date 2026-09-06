import { Field, Int, InputType } from '@nestjs/graphql';
import { Publish } from '../../../prisma/publish-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreatePatnershipInput {
  @Field(() => Int)
  pageId: number;

  @Field()
  name: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the Patnership logoUrl Image.',
  })
  logoUrl?: Upload;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field({ nullable: true })
  origin?: string;

  @Field({ nullable: true })
  websiteLink?: string;
}
