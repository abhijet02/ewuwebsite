import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateFileDirectoryInput {
  @Field()
  fileName: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload a file that will be stored and linked as fileUrl.',
  })
  fileUrl?: Upload;

  @Field({ nullable: true })
  fileMeta?: string;
}

@InputType()
export class CreateFileInput {
  @Field()
  directoryPath: string;

  @Field(() => Upload)
  file: Upload;


  @Field({ nullable: true })
  fileName?: string;
}
@InputType()
export class UpdateFileDirectoryInput extends PartialType(
  CreateFileDirectoryInput,
) {
  @Field(() => Int)
  id: number;
}
