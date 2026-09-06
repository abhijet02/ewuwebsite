import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { InqueryService } from './inquery.service';
import { Inquery } from './entities/inquery.entity';
import { CreateInqueryInput } from './dto/inquery.input';


@Resolver(() => Inquery)
export class InqueryResolver {
  constructor(private readonly inqueryService: InqueryService) {}

  @Mutation(() => Inquery)
  createInquery(
    @Args('createInqueryInput') createInqueryInput: CreateInqueryInput,
  ) {
    return this.inqueryService.create(createInqueryInput);
  }

  @Query(() => [Inquery], { name: 'allInquery' })
  findAllInquery(@Args('page') page: number, @Args('limit') limit: number) {
    return this.inqueryService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => Inquery, { name: 'Inquery' })
  findInqueryById(@Args('id') id: string) {
    return this.inqueryService.findOne(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Inquery)
  async removeInquery(@Args('id') id: number) {
    return this.inqueryService.remove(id);
  }
}
