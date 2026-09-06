import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdminMenuInput {
  @Field({ description: 'Admin menu name field (placeholder)' })
  name: string;

  @Field()
  link: string;
}
