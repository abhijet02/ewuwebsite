import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class CreateAccordionInput {
  @Field()
  title: string;

  @Field(() => Int)
  pageId: number;

  @Field()
  description: string;

  @Field({ nullable: true })
  color?: string;

  @Field(() => Int, { nullable: true })
  section?: number;

  @Field(() => Int, { nullable: true })
  col?: number;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class UpdateAccordionInput extends PartialType(CreateAccordionInput) {
  @Field(() => Int)
  id: number;
}
