import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class WhyChooseDepartment {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  departmentId: number;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  photoUrl?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
