import { Field, Int, InputType } from '@nestjs/graphql';
import { Publish } from '../../../prisma/publish-type.enum';

@InputType()
export class CreateProgramCalenderInput {

  @Field(() => Int)
  year: number;

  @Field()
  label: string;

  @Field(() => Int, { nullable: true })
  order?: number

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}
