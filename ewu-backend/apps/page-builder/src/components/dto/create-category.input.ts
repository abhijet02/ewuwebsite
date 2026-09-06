import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategory {
  @Field(() => Int)
  componentId: number;
  
  @Field()
  category: string;
}
