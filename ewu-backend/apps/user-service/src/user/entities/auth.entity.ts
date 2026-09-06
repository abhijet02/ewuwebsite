import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from '../../prisma/user-type.enum';
import { RoleMenuPermission } from '../../roles/entities/role-menu-permission.entity';

@ObjectType()
export class LoginAttempt {
  @Field()
  email: string;

  @Field()
  tryToAttemptTime: string;

  @Field()
  lockedTime: string;
}
@ObjectType()
export class Auth {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  token: string;

  @Field(() => UserType, { defaultValue: UserType.OTHER })
  userType: keyof typeof UserType;

  @Field(() => LoginAttempt, { nullable: true }) // Nullable in case no login attempts exist
  loginAttempt?: LoginAttempt;

  @Field(() => [RoleMenuPermission], { nullable: true })
  userPermission?: RoleMenuPermission[];
}

@ObjectType()
export class GCode {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
