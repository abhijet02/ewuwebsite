import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class ContactInfo {
  @Field(() => ID)
  id: number;

  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  primaryEmail: string;

  @Field({ nullable: true })
  secondaryEmail?: string;

  @Field({ nullable: true })
  primaryPhone?: string;

  @Field({ nullable: true })
  secondaryPhone?: string;


  @Field({ nullable: true })
  officePhone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  primaryHotline: string;

  @Field({ nullable: true })
  secondaryHotline?: string;

  @Field()
  link: string;

  @Field(() => [ContactContent])
  contents: ContactContent[];

  @Field(() => [ContactPhoto], { nullable: true })
  media?: ContactPhoto[];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}

@ObjectType()
export class ContactContent {
  @Field(() => ID)
  id: number;

  @Field()
  text: string;

  @Field({ nullable: true })
  header?:string

  @Field({ nullable: true })
  link?: string
}

@ObjectType()
export class ContactPhoto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  contactInfoId: number;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  url: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
