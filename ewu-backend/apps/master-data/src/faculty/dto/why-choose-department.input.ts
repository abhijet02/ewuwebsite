import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateWhyChooseDepartmentInput {
  @Field()
  label: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  departmentId: number;

  @Field(() => Upload, {
    nullable: true,
    description: 'Upload photo for alumni',
  })
  photoUrl?: Upload;
}

@InputType()
export class UpdateWhyChooseDepartmentInput extends PartialType(
  CreateWhyChooseDepartmentInput,
) {
  @Field(() => Int)
  id: number;
}
