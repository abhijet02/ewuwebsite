// src/publication/dto/create-publication.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreatePublicationInput {
  @Field(() => Int)
  facultyPersonId: number;

  @Field()
  title: string;

  @Field()
  details: string;
}

@InputType()
export class UpdatePublicationInput extends PartialType(
  CreatePublicationInput,
) {
  @Field(() => Int)
  id: number;
}

