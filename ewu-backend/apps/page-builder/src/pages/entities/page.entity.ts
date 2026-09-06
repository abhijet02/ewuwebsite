import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
@ObjectType()
export class Page {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field()
  link: string;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isHomePage: keyof typeof YesOrNo;

  @Field(() => YesOrNo, { defaultValue: YesOrNo.NO })
  isConvocationPage: keyof typeof YesOrNo;

  @Field({ nullable: true })
  seoDescription?: string;

  @Field(()=> [String],{ nullable: true })
  seoKeywords?:string[]

  @Field(() => Int, { nullable: true })
  homePageId?: number;

  @Field(() => Int, { nullable: true })
  contentOf?: number;
  

  @Field(() => Int, { nullable: true })
  departmentId?: number;

  @Field(() => Int, { nullable: true })
  facultyId?: number;

  @Field(() => Int, { nullable: true })
  clubId?: number;

  @Field(() => Int, { nullable: true })
  officeId?: number;


  @Field(() => Int, { nullable: true })
  groupPageId?: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
