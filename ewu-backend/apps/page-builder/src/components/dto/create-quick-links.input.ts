import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, Length } from 'class-validator';

@InputType()
export class CreateQuickLinksInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  label: string;

  @Field()
  url: string;

  @Field()
  category: string;
}
