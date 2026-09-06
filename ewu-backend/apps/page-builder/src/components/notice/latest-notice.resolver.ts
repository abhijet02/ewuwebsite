import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LatestNoticeService } from './latest-notice.service';
import { Notice } from '../entities/latest-notice.entity';
import { CreateLatestNoticeInput } from '../dto/create-latest-notice.input';
import { UpdateLatestNoticeInput } from '../dto/update-latest-notice.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Notice)
export class LatestNoticeResolver {
  constructor(private readonly latestNoticeService: LatestNoticeService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Notice)
  async createNotice(
    @Args('createNoticeInput') createNoticeInput: CreateLatestNoticeInput,
  ): Promise<Notice> {
    return this.latestNoticeService.create(createNoticeInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Notice)
  async updateNotice(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateNoticeInput') updateNoticeInput: UpdateLatestNoticeInput,
  ): Promise<Notice> {
    return this.latestNoticeService.update(id, updateNoticeInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Notice)
  async deleteNotice(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Notice> {
    return this.latestNoticeService.delete(id);
  }

  @Query(() => [Notice], { name: 'getAllNotices' })
  async findAll(
    @Args('page', { nullable: true}) page?: number, 
    @Args('limit',{ nullable: true}) limit?: number,
    @Args('pageId', { nullable: true}) pageId?: number 
  ): Promise<Notice[]> {
    return this.latestNoticeService.findAll(page, limit, pageId);
  }

  @Query(() => Notice, { name: 'getNoticeById' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Notice> {
    return this.latestNoticeService.findOne(id);
  }

  @Query(() => Notice, { name: 'noticeBySlug' })
  findBySlug(@Args('slug') slug: string) {
    return this.latestNoticeService.findBySlug(slug);
  }
}
