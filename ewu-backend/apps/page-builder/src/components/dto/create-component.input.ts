import { InputType, Field } from '@nestjs/graphql';
import { Upload } from '../../../../../scalars/upload.scalar';

@InputType()
export class CreateComponentInput {
  @Field()
  label: string;

  @Field({ nullable: true })
  viewAllLink?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the Thumbnail files.',
  })
  thumbnailPath?: Upload;
}
