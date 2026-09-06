import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { OfficeDocumentService } from './office-document.service';
import { OfficeDocument } from './entities/office-document.entity';
import {
  CreateOfficeDocumentInput,
  UpdateOfficeDocumentInput,
} from './dto/office-document.input';

@Resolver(() => OfficeDocument)
export class OfficeDocumentResolver {
  constructor(private readonly officeDocumentService: OfficeDocumentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeDocument)
  createOfficeDocument(
    @Args('createOfficeDocumentInput')
    createOfficeDocumentInput: CreateOfficeDocumentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeDocumentService.create(createOfficeDocumentInput, userId);
  }

  @Query(() => [OfficeDocument], { name: 'officeDocuments' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ) {
    return this.officeDocumentService.findAll(page, limit);
  }

  @Query(() => OfficeDocument, { name: 'officeDocument' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.officeDocumentService.findOne(id);
  }

  @Query(() => [OfficeDocument], { name: 'officeDocumentsByOfficeId' })
  findByOfficeId(@Args('officeId', { type: () => Int }) officeId: number) {
    return this.officeDocumentService.findByOfficeId(officeId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeDocument)
  updateOfficeDocument(
    @Args('updateOfficeDocumentInput')
    updateOfficeDocumentInput: UpdateOfficeDocumentInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeDocumentService.update(
      updateOfficeDocumentInput.id,
      updateOfficeDocumentInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OfficeDocument)
  removeOfficeDocument(@Args('id', { type: () => Int }) id: number) {
    return this.officeDocumentService.remove(id);
  }
}
