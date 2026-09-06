import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Component {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field({ nullable: true })
  viewAllLink?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  thumbnailPath?: string;
}
