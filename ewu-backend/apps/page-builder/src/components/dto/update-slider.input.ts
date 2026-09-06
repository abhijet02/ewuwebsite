import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSliderInput } from './create-slider.input';
@InputType()
export class UpdateSliderInput extends PartialType(CreateSliderInput) {
  @Field(() => Int)
  id: number;
}
