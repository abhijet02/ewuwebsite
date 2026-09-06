import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { FaqsService } from './faqs.service';
import { Faq } from './entities/faq.entity';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Faq)
export class FaqsResolver {
  constructor(private readonly faqsService: FaqsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Faq)
  createFaq(
    @Args('createFaqInput') createFaqInput: CreateFaqInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.faqsService.create(createFaqInput, userId);
  }

  @Query(() => [Faq], { name: 'faqs' })
  findAll() {
    return this.faqsService.findAll();
  }

  @Query(() => Faq, { name: 'faq' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.faqsService.findOne(id);
  }

  @Query(() => [Faq], { name: 'faqSearchByQuestion' })
  faqSearchByQuestion(@Args('question') question: string) {
    return this.faqsService.filterByQuestion(question);
  }

  @Query(() => [Faq], { name: 'faqfindByKeyword' })
  faqfindByKeyword(@Args('keywordId') keywordId: number) {
    return this.faqsService.findByKeword(keywordId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Faq)
  updateFaq(
    @Args('updateFaqInput') updateFaqInput: UpdateFaqInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.faqsService.update(updateFaqInput.id, updateFaqInput, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Faq)
  removeFaq(@Args('id', { type: () => Int }) id: number) {
    return this.faqsService.remove(id);
  }
}
