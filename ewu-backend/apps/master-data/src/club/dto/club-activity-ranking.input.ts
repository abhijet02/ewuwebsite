import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class CreateClubActivityRankingInput {
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
}

@InputType()
export class UpdateClubActivityRankingInput extends PartialType(
  CreateClubActivityRankingInput,
) {
  @Field(() => Int)
  id: number;
}
