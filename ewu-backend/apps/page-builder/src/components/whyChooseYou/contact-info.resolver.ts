import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ContactInfoService } from './contact-info.service';
import { ContactInfo } from '../entities/contact-info.entity';
import {
  CreateContactInfoInput,
  UpdateContactInfoInput,
} from '../dto/contact-info.input';

@Resolver(() => ContactInfo)
export class ContactInfoResolver {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  // Fetch all contact info records
  @Query(() => [ContactInfo])
  async findAll(): Promise<ContactInfo[]> {
    return this.contactInfoService.findAll();
  }

  // Fetch a single contact info by ID
  @Query(() => ContactInfo)
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ContactInfo> {
    return this.contactInfoService.findOne(id);
  }

  // Create a new contact info
  @UseGuards(AuthGuard)
  @Mutation(() => ContactInfo)
  async createContactInfo(
    @Args('input') input: CreateContactInfoInput,
    @Context() ctx,
  ): Promise<ContactInfo> {
    const userId = ctx.user.id;
    return this.contactInfoService.create(input, userId);
  }

  // Update an existing contact info
  @UseGuards(AuthGuard)
  @Mutation(() => ContactInfo)
  async updateContactInfo(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateContactInfoInput,
    @Context() ctx,
  ): Promise<ContactInfo> {
    const userId = ctx.user.id;
    return this.contactInfoService.update(id, input, userId);
  }

  // Delete a contact info by ID
  @UseGuards(AuthGuard)
  @Mutation(() => ContactInfo)
  async removeContactInfo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ContactInfo> {
    return this.contactInfoService.remove(id);
  }
}
