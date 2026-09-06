import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Section)
  createSection(@Args('createSectionInput') createSectionInput: CreateSectionInput) {
    return this.sectionService.create(createSectionInput);
  }

  @Query(() => [Section], { name: 'sections' })
  findAll(
      @Args('page', { nullable: true}) page?: number, 
    @Args('limit',  { nullable: true}) limit?: number, 
    @Args('pageId', { nullable: true}) pageId?: number 
  ) {
    return this.sectionService.findAll(page,limit, pageId);
  }

  @Query(() => Section, { name: 'section' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sectionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Section)
  updateSection(@Args('updateSectionInput') updateSectionInput: UpdateSectionInput) {
    return this.sectionService.update(updateSectionInput.id, updateSectionInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Section)
  removeSection(@Args('id', { type: () => Int }) id: number) {
    return this.sectionService.remove(id);
  }
}
