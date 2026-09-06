import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AdminMenu } from './admin-menu.entity';

@ObjectType()
export class RoleMenuPermission {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  roleId: number;

  @Field(() => Int)
  menuId: number;

  @Field()
  canView: boolean;

  @Field()
  canEdit: boolean;

  @Field()
  canAdd: boolean;

  @Field()
  canDelete: boolean;

  @Field()
  canPublish: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Optionally include relations
  //   @Field(() => Role, { nullable: true })
  //   role?: Role;

  @Field(() => AdminMenu, { nullable: true })
  menu?: AdminMenu;
}
