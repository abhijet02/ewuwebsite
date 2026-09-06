import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { AboutOrg } from './entities/about-org.entity';
import { AboutOrgService } from './about-org.service';
import {
  CreateAboutOrgInput,
  UpdateAboutOrgInput,
} from './dto/about-org.input';

@Resolver(() => AboutOrg)
export class AboutOrgResolver {
  constructor(private readonly aboutOrgService: AboutOrgService) {}

  // ➕ Create a new AboutOrg
  @UseGuards(AuthGuard)
  @Mutation(() => AboutOrg)
  createAboutOrg(
    @Args('createAboutOrgInput') createAboutOrgInput: CreateAboutOrgInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.aboutOrgService.create(createAboutOrgInput, userId);
  }

  // 📄 Get all AboutOrg records with pagination
  @Query(() => [AboutOrg], { name: 'aboutOrgs' })
  findAllAboutOrg() {
    return this.aboutOrgService.findAll();
  }

  // 🔍 Get a single AboutOrg by ID
  @Query(() => AboutOrg, { name: 'aboutOrg' })
  findAboutOrgById(@Args('id', { type: () => Int }) id: number) {
    return this.aboutOrgService.findOne(id);
  }

  // ✏️ Update an AboutOrg record
  @UseGuards(AuthGuard)
  @Mutation(() => AboutOrg)
  updateAboutOrg(
    @Args('updateAboutOrgInput') updateAboutOrgInput: UpdateAboutOrgInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.aboutOrgService.update(
      updateAboutOrgInput.id,
      updateAboutOrgInput,
      userId,
    );
  }

  // 🗑️ Remove an AboutOrg record
  @UseGuards(AuthGuard)
  @Mutation(() => AboutOrg)
  removeAboutOrg(@Args('id', { type: () => Int }) id: number) {
    return this.aboutOrgService.remove(id);
  }
}
