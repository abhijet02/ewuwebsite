import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Upload } from '../../../../../scalars/upload.scalar';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateDepartmentInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  mission?: string;

  @Field({ nullable: true })
  vision?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  facultyId: number;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the attachment files.',
    middleware: [pathFinderMiddleware],
  })
  photoUrl: Upload;
  
  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isSubDepartment: keyof typeof YesOrNo;
}

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => Int)
  id: number;
}
