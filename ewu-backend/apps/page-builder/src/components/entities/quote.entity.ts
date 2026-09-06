import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Quote {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  name: string;

  @Field()
  designation: string;

  @Field()
  quote: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  imageUrl?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  nextThumbnailUrl?: string;
}
