// src/publication/entities/publication.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Publication {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  facultyPersonId: number;

  @Field()
  title: string;

  @Field()
  details: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}


@ObjectType()
export class PublicationsPaginationResponse {
  @Field(() => [Publication])
  data: Publication[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}

