import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class Inquery {
  @Field(() => Int)
  id: number;

  @Field()
  fullName: string;

  @Field({ nullable: true })
  studentId?: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  studentEmail?: string;

  @Field({ nullable: true })
  subject?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  attachmentUrl?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
