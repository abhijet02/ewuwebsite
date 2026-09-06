import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateNoteableAlumniInput {
  @Field(() => Int)
  departmentId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  programName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  graduationYear?: string;

  @Field({ nullable: true })
  organization?: string;

  @Field({ nullable: true })
  designation?: string;

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload photo for alumni',
  })
  photoUrl?: Upload;
}

@InputType()
export class UpdateNoteableAlumniInput extends PartialType(
  CreateNoteableAlumniInput,
) {
  @Field(() => Int)
  id: number;
}
