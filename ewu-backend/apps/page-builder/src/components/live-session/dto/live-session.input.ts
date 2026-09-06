import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Publish } from 'apps/page-builder/src/prisma/publish-type.enum';

@InputType()
export class CreateLiveSessionInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  platform?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  expiryDate?: string;

  @Field(() => Publish, { nullable: true })
  isPublished?: Publish;
}

@InputType()
export class UpdateLiveSessionInput extends PartialType(
  CreateLiveSessionInput,
) {
  @Field(() => Int)
  id: number;
}
