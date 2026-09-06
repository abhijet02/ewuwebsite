import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Menu } from './menu.entity';


@ObjectType()
export class MenusPaginationResponse {
  @Field(() => [Menu])
  data: Menu[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
