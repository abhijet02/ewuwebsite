import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../../prisma/publish-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Gallery {
  @Field(() => Int)
  id: number;

  @Field()
  date: Date;

  @Field(() => Int)
  pageId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  year?: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  order?:number;  

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  mediaUrl?: string;

  @Field(() => [GalleryPhoto], { nullable: true })
  galleryPhoto: GalleryPhoto[]

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field()
  updateAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}


@ObjectType()
export class GalleryPhoto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  gallaryId: number;


  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  mediaUrl?: string;


  @Field()
  createdAt: Date;

  @Field()
  updateAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}