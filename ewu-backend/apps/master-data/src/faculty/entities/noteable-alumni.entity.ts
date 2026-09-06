import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class NoteableAlumni {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  departmentId: number;

  @Field({ middleware: [pathFinderMiddleware], nullable: true })
  photoUrl?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  programName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  graduationYear?: string;

  @Field({ nullable: true })
  organization?: string;

  @Field({ nullable: true })
  designation?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}
