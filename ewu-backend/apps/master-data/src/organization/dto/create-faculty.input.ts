import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsAlpha, Length } from 'class-validator';

@InputType()
export class CreatefacultyInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  name: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  description?: string;

  @Field({ nullable: true })
  slug?: string;
}
