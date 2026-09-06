import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { FaqKeyword } from './entities/faqKeyword.entity';
import { FaqKeywordService } from './faq-keyword.service';
import { CreateFaqKeywordInput } from './dto/create-faq-keyword.input';
import { UpdateFaqKeywordInput } from './dto/update-faq-keyword.input';

@Resolver(() => FaqKeyword)
export class FaqKeywordResolver {
  constructor(private readonly faqKeywordService: FaqKeywordService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => FaqKeyword)
  createFaqKeyword(
    @Args('createFaqKeywordInput') createFaqKeywordInput: CreateFaqKeywordInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.faqKeywordService.create(createFaqKeywordInput, userId);
  }

  @Query(() => [FaqKeyword], { name: 'faqkeywords' })
  findAll() {
    return this.faqKeywordService.findAll();
  }

  @Query(() => FaqKeyword, { name: 'faqKeyword' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.faqKeywordService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FaqKeyword)
  updateFaqKeyword(
    @Args('updateFaqKeywordInput') updateFaqKeywordInput: UpdateFaqKeywordInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.faqKeywordService.update(
      updateFaqKeywordInput.id,
      updateFaqKeywordInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FaqKeyword)
  removeFaqKeyword(@Args('id', { type: () => Int }) id: number) {
    return this.faqKeywordService.remove(id);
  }
}
