import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Footer } from '../entities/footer.entity';
import { FooterService } from './footer.service';
import { CreateFooterInput, UpdateFooterInput } from '../dto/footer.input';

@Resolver(() => Footer)
export class FooterResolver {
  constructor(private readonly footerService: FooterService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Footer)
  createFooter(
    @Args('createFooterInput') createFooterInput: CreateFooterInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.footerService.create(createFooterInput, userId);
  }

  @Query(() => [Footer], { name: 'allFooter' })
  findAllFooter(@Args('page') page: number, @Args('limit') limit: number) {
    return this.footerService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => Footer, { name: 'Footer' })
  findFooterById(@Args('id') id: string) {
    return this.footerService.findOne(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Footer)
  updateFooter(
    @Args('updateFooterInput') updateFooterInput: UpdateFooterInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.footerService.update(
      updateFooterInput.id,
      updateFooterInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Footer)
  async removeFooter(@Args('id') id: number) {
    return this.footerService.remove(id);
  }
}
