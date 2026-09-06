import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Footer {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field({ nullable: true })
  headerText?: string;

  @Field({ nullable: true })
  footerApplyNowText?: string;

  @Field({ nullable: true })
  footerApplyNowLink?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  footerLogoUrl?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  footerMediaUrl?: string;

  @Field({ nullable: true })
  footerContactUsMobile?: string;

  @Field({ nullable: true })
  footerContactUsEmail?: string;

  @Field({ nullable: true })
  footerContactUsHotline?: string;

  @Field({ nullable: true })
  footerAddress?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  footerMap?: string;
  
  @Field({ nullable: true })
  footerMapPath?: string


  @Field({ nullable: true })
  footerCopyRightTitle?: string;


  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

    @Field(() => Int)
  createdBy: number;

  @Field(() => Int,{ nullable: true })
  updatedBy?: number;
}
