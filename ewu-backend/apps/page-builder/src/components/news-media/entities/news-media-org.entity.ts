// news-media-org/entities/news-media-org.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class NewsMediaOrg {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  newsMediaId?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  thumbnail?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
