import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRoleMenuPermissionInput {
  @Field(() => Int, { description: 'Role ID' })
  roleId: number;

  @Field(() => Int, { description: 'Menu ID' })
  menuId: number;

  @Field({ description: 'Permission to view the menu' })
  canView: boolean;

  @Field({ description: 'Permission to edit the menu' })
  canEdit: boolean;

  @Field()
  canAdd: boolean;

  @Field()
  canDelete: boolean;

  @Field()
  canPublish: boolean;
}
