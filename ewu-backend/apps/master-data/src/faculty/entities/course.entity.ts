import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => Int)
  id: number;

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
