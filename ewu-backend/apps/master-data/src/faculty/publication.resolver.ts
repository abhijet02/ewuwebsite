// src/publication/publication.resolver.ts

import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import {
  Publication,
  PublicationsPaginationResponse,
} from './entities/publication.entity';
import {
  CreatePublicationInput,
  UpdatePublicationInput,
} from './dto/publication.input';

@Resolver(() => Publication)
export class PublicationResolver {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Publication)
  createPublication(
    @Args('createPublicationInput')
    createPublicationInput: CreatePublicationInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.publicationService.create(createPublicationInput, userId);
  }

  @Query(() => [Publication], { name: 'publications' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page,
    @Args('limit', { type: () => Int, nullable: true }) limit,
  ) {
    return this.publicationService.findAll(page, limit);
  }

  @Query(() => PublicationsPaginationResponse, {
    name: 'publicationsPaginated',
  })
  findAllPaginated(
    @Args('page', { type: () => Int, nullable: true }) page,
    @Args('limit', { type: () => Int, nullable: true }) limit,
  ) {
    return this.publicationService.findAllWithPagination(page, limit);
  }

  @Query(() => [Publication], { name: 'publicationsByFaculty' })
  findByFacultyId(
    @Args('facultyPersonId', { type: () => Int }) facultyPersonId: number,
  ) {
    return this.publicationService.findByFacultyId(facultyPersonId);
  }

  @Query(() => Publication, { name: 'publication' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.publicationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Publication)
  updatePublication(
    @Args('updatePublicationInput')
    updatePublicationInput: UpdatePublicationInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.publicationService.update(
      updatePublicationInput.id,
      updatePublicationInput,
      userId
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Publication)
  removePublication(@Args('id', { type: () => Int }) id: number) {
    return this.publicationService.remove(id);
  }
}
