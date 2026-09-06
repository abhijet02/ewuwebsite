import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class CreateDescriptionInput {
  @Field(() => Int)
  pageId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class UpdateDescriptionInput extends PartialType(CreateDescriptionInput) {
  @Field(() => Int)
  id: number;
}
