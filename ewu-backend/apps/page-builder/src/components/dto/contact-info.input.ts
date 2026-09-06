// src/contact-info/dto/create-contact-info.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { pathFinderMiddlewareForArrayOfString } from 'middleware/pathFinderMiddleware';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateContactInfoInput {
  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field()
  primaryEmail: string;

  @Field({ nullable: true })
  secondaryEmail?: string;

  @Field({ nullable: true })
  primaryPhone?: string;

  @Field({ nullable: true })
  secondaryPhone?: string;

  @Field({ nullable: true })
  officePhone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  primaryHotline: string;

  @Field({ nullable: true })
  secondaryHotline?: string;

  @Field()
  link: string;

  @Field(() => [CreateContactContentInput], { nullable: true })
  contents?: CreateContactContentInput[];

  @Field(() => [Upload], {
    nullable: true,
    description: 'Input for the news media files.',
    middleware: [pathFinderMiddlewareForArrayOfString],
  })
  media?: Upload[];
}

@InputType()
export class CreateContactContentInput {
  @Field()
  text: string;

  @Field({ nullable: true })
  header?:string

  @Field({ nullable: true })
  link?: string
}

@InputType()
export class UpdateContactInfoInput extends PartialType(
  CreateContactInfoInput,
) {
  @Field(() => Int)
  id: number;
}
