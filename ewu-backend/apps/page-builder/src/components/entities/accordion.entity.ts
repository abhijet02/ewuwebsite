import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from '../../prisma/publish-type.enum';

@ObjectType()
export class Accordion {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  pageId: number

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  color?: string;
  
  @Field(() => Int, { nullable: true })
  section?: number;

  @Field(() => Int, { nullable: true })
  col?: number;


  @Field({ nullable: true })
  description?: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;
}
