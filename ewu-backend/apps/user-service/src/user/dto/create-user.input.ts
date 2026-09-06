import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsOptional,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserType } from '../../prisma/user-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateUserInput {
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

  @Field()
  @IsOptional()
  @IsAlpha()
  @Length(0, 255)
  firstName?: string;

  @Field()
  @IsOptional()
  @IsAlpha()
  @Length(0, 255)
  lastName?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  mobileNo?: string;

  @Field({ nullable: true })
  bloodGroup?: string;

  @Field()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @Field(() => UserType, { defaultValue: UserType.OTHER })
  userType: keyof typeof UserType;

  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the Photo Image.',
  })
  profilePhotoUrl?: Upload;
  
  @Field(() => Upload, {
    nullable: true,
    description: 'Input for the signature Image.',
  })
  signatureUrl?: Upload;
  
  @Field()
  activateStatus: boolean
}
