import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateViewAllInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  componentId: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  pageId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  viewAllLink: string;
}

@InputType()
export class UpdateViewAllInput extends PartialType(CreateViewAllInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}