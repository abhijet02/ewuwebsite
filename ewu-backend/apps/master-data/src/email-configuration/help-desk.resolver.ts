import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { HelpDeskService } from './help-desk.service';
import { HelpDesk } from './entities/help-desk.entity';
import {
  CreateHelpDeskInput,
  UpdateHelpDeskInput,
} from './dto/help-desk.input';

@Resolver(() => HelpDesk)
export class HelpDeskResolver {
  constructor(private readonly helpDeskService: HelpDeskService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => HelpDesk)
  createHelpDesk(
    @Args('createHelpDeskInput') createHelpDeskInput: CreateHelpDeskInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.helpDeskService.create(createHelpDeskInput, userId);
  }

  @Query(() => [HelpDesk], { name: 'allHelpDesk' })
  findAllHelpDesk(@Args('page') page: number, @Args('limit') limit: number) {
    return this.helpDeskService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => HelpDesk, { name: 'HelpDesk' })
  findHelpDeskById(@Args('id') id: string) {
    return this.helpDeskService.findOne(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Mutation(() => HelpDesk)
  updateHelpDesk(
    @Args('updateHelpDeskInput') updateHelpDeskInput: UpdateHelpDeskInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.helpDeskService.update(
      updateHelpDeskInput.id,
      updateHelpDeskInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => HelpDesk)
  async removeHelpDesk(@Args('id') id: number) {
    return this.helpDeskService.remove(id);
  }
}
