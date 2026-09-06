import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { LiveSessionService } from './live-session.service';
import { LiveSession } from './entities/live-session.entity';
import {
  CreateLiveSessionInput,
  UpdateLiveSessionInput,
} from './dto/live-session.input';

@Resolver(() => LiveSession)
export class LiveSessionResolver {
  constructor(private readonly liveSessionService: LiveSessionService) {}

  // 🔒 Create (Authenticated)
  @UseGuards(AuthGuard)
  @Mutation(() => LiveSession)
  createLiveSession(
    @Args('createLiveSessionInput')
    createLiveSessionInput: CreateLiveSessionInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.liveSessionService.create(createLiveSessionInput, userId);
  }

  // 📋 Find all (with optional pagination)
  @Query(() => [LiveSession], { name: 'liveSessions' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    return this.liveSessionService.findAll(page, limit);
  }

  // 🔍 Find one
  @Query(() => LiveSession, { name: 'liveSession' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.liveSessionService.findOne(id);
  }

  // 🧩 Optional — Find published sessions
  @Query(() => [LiveSession], { name: 'publishedLiveSessions' })
  findPublished() {
    return this.liveSessionService.findPublished();
  }

  // 🔒 Update (Authenticated)
  @UseGuards(AuthGuard)
  @Mutation(() => LiveSession)
  updateLiveSession(
    @Args('updateLiveSessionInput')
    updateLiveSessionInput: UpdateLiveSessionInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.liveSessionService.update(
      updateLiveSessionInput.id,
      updateLiveSessionInput,
      userId,
    );
  }

  // 🔒 Remove (Authenticated)
  @UseGuards(AuthGuard)
  @Mutation(() => LiveSession)
  removeLiveSession(@Args('id', { type: () => Int }) id: number) {
    return this.liveSessionService.remove(id);
  }
}
