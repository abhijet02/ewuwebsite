import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
@InputType()
export class CreatePageInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  label: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  link: string;

  @IsOptional()
  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isHomePage: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isConvocationPage: keyof typeof YesOrNo;

  @Field({ nullable: true })
  seoDescription?: string;

  @Field(()=> [String],{ nullable: true })
  seoKeywords?:string[]

  @IsOptional()
  @Field(() => Int, { nullable: true })
  homePageId?: number;

  @Field(() => Int, { nullable: true })
  contentOf?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  departmentId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  facultyId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  clubId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  officeId?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  groupPageId?: number;
}
