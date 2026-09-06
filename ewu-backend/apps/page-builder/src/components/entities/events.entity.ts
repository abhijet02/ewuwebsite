import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';
import { Publish } from '../../prisma/publish-type.enum';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@ObjectType()
export class Event {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number;

  @Field()
  category: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  order: number;

  @Field()
  fromDate: Date;

  @Field({ nullable: true })
  toDate?: Date;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachmentUrl?: string;

  @Field({ nullable: true })
  attachmentName?: string;

  @Field(() => [Int], { nullable: true })
  isCopiedTo?: number[];

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isMarquee: keyof typeof YesOrNo;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isArchived: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isApprovedByAdmin: keyof typeof YesOrNo;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;

  @Field(() => [EventSpeaker], { nullable: true })
  eventSpeaker?: EventSpeaker[];

  @Field(() => [EventAttachment], { nullable: true })
  attachments?: EventAttachment[];
}

@ObjectType()
export class EventSpeaker {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  eventId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  companyName?: string;

  @Field({ middleware: [pathFinderMiddleware] })
  photoUrl?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}

@ObjectType()
export class EventAttachment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  eventId: number;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  attachmentUrl?: string;

  @Field({ nullable: true })
  attachmentName?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
