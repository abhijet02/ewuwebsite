import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProgramCategory {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  order: number;

  @Field({nullable: true})
  programDetails?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy?: number;
}
