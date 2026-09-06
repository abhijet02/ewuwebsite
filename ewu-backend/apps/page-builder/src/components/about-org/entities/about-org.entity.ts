import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class AboutOrg {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  sectionTitle?: string;

  @Field({ nullable: true })
  sectionSubTitle?: string;

  @Field({ nullable: true })
  aboutUstitle?: string;

  @Field({ nullable: true })
  aboutUs?: string;

  @Field({ nullable: true })
  missionTitle?: string;

  @Field({ nullable: true })
  mission?: string;

  @Field({ nullable: true })
  visionTitle?: string;

  @Field({ nullable: true })
  vision?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  mediaUrl?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
