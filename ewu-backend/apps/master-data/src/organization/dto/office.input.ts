import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';

@InputType()
export class CreateOfficeInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  location?: string;
  
  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isBOT: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isAuthority: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isDepartmental: keyof typeof YesOrNo;

  @Field(() => Int,{ nullable: true})
  departmentId?: number
}

@InputType()
export class UpdateOfficeInput extends PartialType(CreateOfficeInput) {
  @Field(() => Int)
  id: number;
}
