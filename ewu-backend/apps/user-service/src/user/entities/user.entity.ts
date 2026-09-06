import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { UserType } from '../../prisma/user-type.enum';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  roleId: number;

  @Field(() => [Int], { nullable: true })
  officeId?: number[];

  @Field(() => [Int], { nullable: true })
  officeMemberId?: number[];

  @Field(() => [Int], { nullable: true })
  clubId?: number[];

  @Field(() => [Int], { nullable: true })
  clubMemberId?: number[];

  @Field(() => [Int], { nullable: true })
  facultyId?: number[];

  @Field(() => [Int], { nullable: true })
  facultyPersonId?: number[];

  @Field(() => [Int], { nullable: true })
  departmentId?: number[];

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  mobileNo?: string;

  @Field({ nullable: true })
  bloodGroup?: string;

  
  @Field()
  password: string;

  @Field()
  rememberToken: string;

  @Field({ nullable: true })
  emailVarifiedAt: string;

  @Field(() => UserType, { defaultValue: UserType.OTHER })
  userType: keyof typeof UserType;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  profilePhotoUrl?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  signatureUrl?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field({ nullable: true })
  activateStatus?: boolean;

  @Field({ nullable: true })
  passwordLastUpdated?: Date;
}
