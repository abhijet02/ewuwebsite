import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateScheduleInput {
  @Field()
  day: string;

  @Field(() => Int, { nullable: true })
  officeMemberId?: number;
}


@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  @Field(() => Int)
  id: number;
}
