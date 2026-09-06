import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { FacultypersonService } from './faculty-person.service';
import { FacultyPerson } from './entities/faculty-person.entity';
import {
  CreateFacultypersonInput,
  UpdateFacultypersonInput,
} from './dto/faculty-person.input';

@Resolver(() => FacultyPerson)
export class FacultypersonResolver {
  constructor(private readonly facultypersonService: FacultypersonService) {}

  // Fetch all chairpersons with pagination
  @Query(() => [FacultyPerson], { name: 'facultyPersons' })
  async getFacultyPersons(
    @Args('page', { type: () => Int }) page,
    @Args('limit', { type: () => Int }) limit,
  ): Promise<FacultyPerson[]> {
    return this.facultypersonService.findAll(page, limit);
  }

  // Fetch a single chairperson by ID
  @Query(() => FacultyPerson, { name: 'facultyPerson' })
  async getFacultyPerson(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<FacultyPerson> {
    return this.facultypersonService.findOne(id);
  }

  @Mutation(() => FacultyPerson)
  async createFacultyPersonRquest(
    @Args('createFacultyPersonRquestInput')
    createFacultyPersonRquestInput: CreateFacultypersonInput,
  ): Promise<FacultyPerson> {
    return this.facultypersonService.create(createFacultyPersonRquestInput, 0);
  }

  // Create a new chairperson
  @UseGuards(AuthGuard)
  @Mutation(() => FacultyPerson)
  async createFacultyPerson(
    @Args('createFacultypersonInput')
    createFacultypersonInput: CreateFacultypersonInput,
    @Context() ctx,
  ): Promise<FacultyPerson> {
    const userId = ctx.user.id;
    return this.facultypersonService.create(createFacultypersonInput, userId);
  }

  // Update an existing chairperson
  @UseGuards(AuthGuard)
  @Mutation(() => FacultyPerson)
  async updateFacultyPerson(
    @Args('updateFacultypersonInput')
    updateFacultypersonInput: UpdateFacultypersonInput,
    @Context() ctx,
  ): Promise<FacultyPerson> {
    const userId = ctx.user.id;
    return this.facultypersonService.update(
      updateFacultypersonInput.id,
      updateFacultypersonInput,
      userId,
    );
  }

  // Delete a chairperson by ID
  @UseGuards(AuthGuard)
  @Mutation(() => FacultyPerson)
  async removeFacultyPerson(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<FacultyPerson> {
    return await this.facultypersonService.remove(id);
  }
}
