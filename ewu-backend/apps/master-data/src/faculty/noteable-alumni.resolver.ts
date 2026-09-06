import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { NoteableAlumniService } from './noteable-alumni.service';
import { NoteableAlumni } from './entities/noteable-alumni.entity';
import {
  CreateNoteableAlumniInput,
  UpdateNoteableAlumniInput,
} from './dto/noteable-alumni.input';

@Resolver(() => NoteableAlumni)
export class NoteableAlumniResolver {
  constructor(private readonly noteableAlumniService: NoteableAlumniService) {}

  // Fetch all alumni with pagination
  @Query(() => [NoteableAlumni], { name: 'noteableAlumni' })
  async getNoteableAlumni(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<NoteableAlumni[]> {
    return this.noteableAlumniService.findAll(page, limit);
  }

  // Fetch a single alumni by ID
  @Query(() => NoteableAlumni, { name: 'noteableAlumnus' })
  async getAlumnus(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<NoteableAlumni> {
    return this.noteableAlumniService.findOne(id);
  }

  // Create a new alumni
  @UseGuards(AuthGuard)
  @Mutation(() => NoteableAlumni)
  async createNoteableAlumni(
    @Args('createNoteableAlumniInput')
    createNoteableAlumniInput: CreateNoteableAlumniInput,
    @Context() ctx,
  ): Promise<NoteableAlumni> {
    const userId = ctx.user.id;
    return this.noteableAlumniService.create(createNoteableAlumniInput, userId);
  }

  // Update an existing alumni
  @UseGuards(AuthGuard)
  @Mutation(() => NoteableAlumni)
  async updateNoteableAlumni(
    @Args('updateNoteableAlumniInput')
    updateNoteableAlumniInput: UpdateNoteableAlumniInput,
    @Context() ctx,
  ): Promise<NoteableAlumni> {
    const userId = ctx.user.id;
    return this.noteableAlumniService.update(
      updateNoteableAlumniInput.id,
      updateNoteableAlumniInput,
      userId,
    );
  }

  // Delete an alumni by ID
  @UseGuards(AuthGuard)
  @Mutation(() => NoteableAlumni)
  async removeNoteableAlumni(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<NoteableAlumni> {
    return await this.noteableAlumniService.remove(id);
  }
}
