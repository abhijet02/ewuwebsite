// news-media-org/news-media-org.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsMediaOrgService } from './news-media-org.service';
import { NewsMediaOrg } from './entities/news-media-org.entity';
import {
  CreateNewsMediaOrgInput,
  UpdateNewsMediaOrgInput,
} from './dto/news-media-org.input';

@Resolver(() => NewsMediaOrg)
export class NewsMediaOrgResolver {
  constructor(private readonly service: NewsMediaOrgService) {}

  @Mutation(() => NewsMediaOrg)
  createNewsMediaOrg(
    @Args('createNewsMediaOrgInput') createInput: CreateNewsMediaOrgInput,
  ) {
    return this.service.create(createInput);
  }

  @Query(() => [NewsMediaOrg], { name: 'newsMediaOrgs' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => NewsMediaOrg, { name: 'newsMediaOrg' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => NewsMediaOrg)
  updateNewsMediaOrg(
    @Args('updateNewsMediaOrgInput') updateInput: UpdateNewsMediaOrgInput,
  ) {
    return this.service.update(updateInput.id, updateInput);
  }

  @Mutation(() => NewsMediaOrg)
  removeNewsMediaOrg(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
