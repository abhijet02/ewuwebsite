import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@ObjectType()
export class HelpDesk {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isContact: keyof typeof YesOrNo;

  @Field(() => Int ,{ nullable: true})
  departmentId?: number

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  iconPath?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy?: number;
}
