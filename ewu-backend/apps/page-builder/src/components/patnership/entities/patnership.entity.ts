import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../../prisma/publish-type.enum';

@ObjectType()
export class Patnership {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field()
  name: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  logoUrl?: string;


  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;


  @Field({ nullable: true })
  origin?: string;

  
  @Field({ nullable: true })
  websiteLink?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}

