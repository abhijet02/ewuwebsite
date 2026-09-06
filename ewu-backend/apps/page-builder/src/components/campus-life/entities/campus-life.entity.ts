import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../../prisma/publish-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class CampusLife {
  @Field(() => Int)
  id: number;

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

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  mediaUrl?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
