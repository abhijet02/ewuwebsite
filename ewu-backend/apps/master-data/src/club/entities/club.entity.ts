import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';


@ObjectType()
export class Club {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  introduction?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  mission?: string;

  @Field({ nullable: true })
  vission?: string;

  @Field({ nullable: true })
  primaryColor?: string;

  @Field({ nullable: true })
  secondaryColor?: string;
  
  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  logoUrl?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}

