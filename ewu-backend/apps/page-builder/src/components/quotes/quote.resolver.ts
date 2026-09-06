import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { QuoteService } from './quote.service';
import { Quote } from '../entities/quote.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { CreateQuote, UpdateQuote } from '../dto/create-quote.input';

@Resolver(() => Quote)
export class QuoteResolver {
  constructor(private readonly quoteService: QuoteService) {}

  
  @UseGuards(AuthGuard)
  @Mutation(() => Quote)
  createQuote(@Args('data') data: CreateQuote, @Context() ctx) {
    const userId = ctx.user.id;
    return this.quoteService.createQuote(data, userId);
  }

  @Query(() => [Quote], { name: 'Quotes' })
  findAllQuotes(@Args('page') page: number, @Args('limit') limit: number) {
    return this.quoteService.findAllQuotes(page, limit);
  }

  // ✅ Get a single Quote by ID
  @Query(() => Quote, { name: 'Quote' })
  findOneQuotes(@Args('id') id: string) {
    return this.quoteService.findOneQuotes(parseInt(id));
  }

  // ✅ Update a quote by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Quote)
  async updateQuote(
    @Args('updateQuote') updateQuote: UpdateQuote,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.quoteService.update(updateQuote.id, updateQuote, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Quote)
  async removeQuote(@Args('id') id: number) {
    return this.quoteService.delete(id);
  }
}
