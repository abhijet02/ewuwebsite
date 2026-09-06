import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ClubActivityRanking {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  clubId: number;

  @Field(() => Int)
  groomingSessionCount: number;

  @Field({ nullable: true })
  groomingSessionShortDescription?: string;

  @Field(() => Int)
  competitionCount: number;

  @Field({ nullable: true })
  competitionShortDescription?: string;

  @Field(() => Int)
  seminerCount: number;

  @Field({ nullable: true })
  seminerShortDescription?: string;

  @Field(() => Int)
  workshopCount: number;

  @Field({ nullable: true })
  workshopShortDescription?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;
}
