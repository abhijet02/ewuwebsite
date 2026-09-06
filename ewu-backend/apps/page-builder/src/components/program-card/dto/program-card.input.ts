import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';

@InputType()
export class CreateProgramCardInput {
  @Field(() => Int, { nullable: true })
  pageId?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  logoLink?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}

@InputType()
export class UpdateProgramCardInput extends PartialType(
  CreateProgramCardInput,
) {
  @Field(() => Int)
  id: number;
}
