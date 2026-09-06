import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Header {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId?: number;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  headerLogoUrl?: string;

  @Field({ nullable: true })
  headerLogoLink?: string;

  @Field({ nullable: true })
  megamenuTitle?: string;

  @Field({ nullable: true })
  megaMenuBtn1Title?: string;

  @Field({ nullable: true })
  megaMenuBtn1Link?: string;

  @Field({ nullable: true })
  megaMenuBtn2Title?: string;

  @Field({ nullable: true })
  megaMenuBtn2Link?: string;

  @Field({ nullable: true })
  megaMenuBtn3Title?: string;

  @Field({ nullable: true })
  megaMenuBtn3Link?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int,{ nullable: true })
  updatedBy?: number;
}