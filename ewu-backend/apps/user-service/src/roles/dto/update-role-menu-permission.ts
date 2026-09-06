import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateRoleMenuPermissionInput } from './create-role-menu-permission.input';

@InputType()
export class UpdateRoleMenuPermissionInput extends PartialType(
  CreateRoleMenuPermissionInput,
) {
  @Field(() => Int)
  id: number;
}