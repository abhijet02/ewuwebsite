import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { YesOrNo } from 'apps/page-builder/src/prisma/yes-or-no-type.enum';
import { Upload } from 'scalars/upload.scalar';

@InputType()
export class CreateHelpDeskInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isContact: keyof typeof YesOrNo;

  @Field(() => Int ,{ nullable: true})
  departmentId?: number

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  iconPath?: string;
}

@InputType()
export class UpdateHelpDeskInput extends PartialType(CreateHelpDeskInput) {
  @Field(() => Int)
  id: number;
}
