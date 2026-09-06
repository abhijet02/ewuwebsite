import { InputType, Field, Int } from '@nestjs/graphql';
import { Upload } from '../../../../../../scalars/upload.scalar';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../../prisma/publish-type.enum';

@InputType()
export class CreateFeedbackOfStudentInput {
  @Field(() => Int)
  pageId: number;

  @Field(() => Int)
  order: number;

  @Field(() => Int, { nullable: true})
  departmentId?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  year?:string

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the photoUrl files.',
    middleware: [pathFinderMiddleware],
  })
  photoUrl?: Upload;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the photoUrl files.',
    middleware: [pathFinderMiddleware],
  })
  attachmentUrl?: Upload;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}
