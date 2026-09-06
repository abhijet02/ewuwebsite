import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PagesService } from './pages.service';
import { Page } from './entities/page.entity';
import { CreatePageInput } from './dto/create-page.input';
import { UpdatePageInput } from './dto/update-page.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Page)
export class PagesResolver {
  constructor(private readonly pagesService: PagesService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Page)
  createPage(@Args('createPageInput') createPageInput: CreatePageInput) {
    return this.pagesService.create(createPageInput);
  }

  @Query(() => [Page], { name: 'pages' })
  findAll(@Args('page') page:number, @Args('limit') limit:number) {
    return this.pagesService.findAll(page,limit);
  }

  @Query(() => Page, { name: 'page' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pagesService.findOne(id);
  }

  @Query(() => [Page], { name: 'pageByLink' })
  findByLink(@Args('link') link: string) {
    return this.pagesService.findByLink(link);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Page)
  updatePage(@Args('updatePageInput') updatePageInput: UpdatePageInput) {
    return this.pagesService.update(updatePageInput.id, updatePageInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Page)
  removePage(@Args('id', { type: () => Int }) id: number) {
    return this.pagesService.remove(id);
  }
}
