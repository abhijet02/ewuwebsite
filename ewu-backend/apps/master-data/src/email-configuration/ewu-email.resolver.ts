import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards, Injectable } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

import { EwuEmail } from './entities/ewu-email.entity';
import {
  CreateEwuEmailInput,
  UpdateEwuEmailInput,
} from './dto/ewu-email.input';
import { EwuEmailService } from './ewu-email.service';

@Resolver(() => EwuEmail)
@Injectable()
export class EwuEmailResolver {
  constructor(private readonly ewuEmailService: EwuEmailService) {}

  @Query(() => [EwuEmail], { name: 'ewuEmails' })
  async getEwuEmails(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<EwuEmail[]> {
    return this.ewuEmailService.findAll(page, limit);
  }

  @Query(() => EwuEmail, { name: 'ewuEmail' })
  async getEwuEmail(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<EwuEmail> {
    return this.ewuEmailService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EwuEmail)
  async createEwuEmail(
    @Args('createEwuEmailInput') createEwuEmailInput: CreateEwuEmailInput,
    @Context() ctx,
  ): Promise<EwuEmail> {
    const userId = ctx.user.id;
    return this.ewuEmailService.create(createEwuEmailInput, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EwuEmail)
  async updateEwuEmail(
    @Args('updateEwuEmailInput') updateEwuEmailInput: UpdateEwuEmailInput,
    @Context() ctx,
  ): Promise<EwuEmail> {
    const userId = ctx.user.id;
    return this.ewuEmailService.update(
      updateEwuEmailInput.id,
      updateEwuEmailInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EwuEmail)
  async removeEwuEmail(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<EwuEmail> {
    return this.ewuEmailService.remove(id);
  }
}
