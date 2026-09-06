import { InputType, Field, Int, Float, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field(() => Int)
  programId: number;
  
  @Field()
  courseCode: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int)
  departmentId: number;

  @Field()
  category: string;

  @Field(() => Float)
  creditHour: number;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  preRequisite?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  @Field(() => Int)
  id: number;
}
