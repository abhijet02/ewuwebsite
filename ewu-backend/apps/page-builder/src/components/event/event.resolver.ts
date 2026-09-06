import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from '../entities/events.entity';
import { CreateEventInput } from '../dto/create-events.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { UpdateEventInput } from '../dto/update-event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Event)
  async createEvent(
    @Args('createEventInput')
    createEventInput: CreateEventInput,
    @Context() ctx,
  ): Promise<Event> {
    const userId = ctx.user.id;
    return this.eventService.create(createEventInput, userId);
  }

  @Query(() => [Event], { name: 'events' })
  async findAllEvent(
    @Args('page', { nullable: true}) page?: number, 
    @Args('limit',{ nullable: true}) limit?: number,
    @Args('pageId', { nullable: true}) pageId?: number 
  ) {
    return this.eventService.findAll(page, limit, pageId);
  }
  /**
   * Get a single important date by ID
   */
  @Query(() => Event, { name: 'event' })
  async findOneEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Query(() => Event, { name: 'eventBySlug' })
  findBySlug(@Args('slug') slug: string) {
    return this.eventService.findBySlug(slug);
  }

  /**
   * Update an important date entry
   */
  @UseGuards(AuthGuard)
  @Mutation(() => Event)
  async updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEventInput')
    updateEventInput: UpdateEventInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;

    return this.eventService.update(id, updateEventInput, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Event)
  async deleteEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.delete(id);
  }
}
