import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Header } from '../entities/header.entity';
import { HeaderService } from './header.service';
import { CreateHeaderInput, UpdateHeaderInput } from '../dto/header.input';

@Resolver(() => Header)
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Header)
  createHeader(
    @Args('createHeaderInput') createHeaderInput: CreateHeaderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.headerService.create(createHeaderInput, userId);
  }

  @Query(() => [Header], { name: 'allHeader' })
  findAllHeader(@Args('page') page: number, @Args('limit') limit: number) {
    return this.headerService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => Header, { name: 'Header' })
  findHeaderById(@Args('id') id: string) {
    return this.headerService.findOne(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Header)
  updateHeader(
    @Args('updateHeaderInput') updateHeaderInput: UpdateHeaderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.headerService.update(
      updateHeaderInput.id,
      updateHeaderInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Header)
  async removeHeader(@Args('id') id: number) {
    return this.headerService.remove(id);
  }
}
