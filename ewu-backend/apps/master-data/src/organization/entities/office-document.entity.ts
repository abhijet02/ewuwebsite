import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class OfficeDocument {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  officeId: number;

  @Field(() => Int, { defaultValue: 0 })
  order: number;

  @Field({ nullable: true })
  fileName?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  fileUrl?: string;

  @Field({ nullable: true })
  link?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
