import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { FacultyMemberDocumentService } from './faculty-member-document.service';
import { FacultyMemberDocument } from './entities/faculty-member-document.entity';
import {
  CreateFacultyMemberDocumentInput,
  UpdateFacultyMemberDocumentInput,
} from './dto/faculty-member-document.input';

@Resolver(() => FacultyMemberDocument)
export class FacultyMemberDocumentResolver {
  constructor(
    private readonly facultyMemberDocumentService: FacultyMemberDocumentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => FacultyMemberDocument)
  createFacultyMemberDocument(
    @Args('createFacultyMemberDocumentInput')
    createFacultyMemberDocumentInput: CreateFacultyMemberDocumentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.facultyMemberDocumentService.create(
      createFacultyMemberDocumentInput,
      userId,
    );
  }

  @Query(() => [FacultyMemberDocument], { name: 'facultyMemberDocuments' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page,
    @Args('limit', { type: () => Int, nullable: true }) limit,
  ) {
    return this.facultyMemberDocumentService.findAll(page, limit);
  }

  @Query(() => FacultyMemberDocument, { name: 'facultyMemberDocument' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.facultyMemberDocumentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FacultyMemberDocument)
  updateFacultyMemberDocument(
    @Args('updateFacultyMemberDocumentInput')
    updateFacultyMemberDocumentInput: UpdateFacultyMemberDocumentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.facultyMemberDocumentService.update(
      updateFacultyMemberDocumentInput.id,
      updateFacultyMemberDocumentInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FacultyMemberDocument)
  removeFacultyMemberDocument(@Args('id', { type: () => Int }) id: number) {
    return this.facultyMemberDocumentService.remove(id);
  }
}
