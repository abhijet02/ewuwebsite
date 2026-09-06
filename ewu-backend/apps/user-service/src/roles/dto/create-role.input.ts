import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field({ description: 'Role name field (placeholder)' })
  name: string;
}
