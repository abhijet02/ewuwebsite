import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../../prisma/publish-type.enum';

@ObjectType()
export class FeedbackOfStudent {
  @Field(() => Int)
  id: number;

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


  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  photoUrl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachmentUrl?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}

