import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { OfficeMemberDocumentService } from './office-member-document.service';
import { OfficeMemberDocument } from './entities/office-member-document.entity';
import {
  CreateOfficeMemberDocumentInput,
  UpdateOfficeMemberDocumentInput,
} from './dto/office-member-document.input';

@Resolver(() => OfficeMemberDocument)
export class OfficeMemberDocumentResolver {
  constructor(
    private readonly officeMemberDocumentService: OfficeMemberDocumentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeMemberDocument)
  createOfficeMemberDocument(
    @Args('createOfficeMemberDocumentInput')
    createOfficeMemberDocumentInput: CreateOfficeMemberDocumentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeMemberDocumentService.create(
      createOfficeMemberDocumentInput,
      userId,
    );
  }

  @Query(() => [OfficeMemberDocument], { name: 'officeMemberDocuments' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ) {
    return this.officeMemberDocumentService.findAll(page, limit);
  }

  @Query(() => OfficeMemberDocument, { name: 'officeMemberDocument' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.officeMemberDocumentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeMemberDocument)
  updateOfficeMemberDocument(
    @Args('updateOfficeMemberDocumentInput')
    updateOfficeMemberDocumentInput: UpdateOfficeMemberDocumentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeMemberDocumentService.update(
      updateOfficeMemberDocumentInput.id,
      updateOfficeMemberDocumentInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeMemberDocument)
  removeOfficeMemberDocument(@Args('id', { type: () => Int }) id: number) {
    return this.officeMemberDocumentService.remove(id);
  }
}
