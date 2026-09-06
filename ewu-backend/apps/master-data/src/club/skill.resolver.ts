import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards, Injectable } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.input';

@Resolver(() => Skill)
@Injectable()
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [Skill], { name: 'skills' })
  async getSkills(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<Skill[]> {
    return this.skillService.findAll(page, limit);
  }

  @Query(() => Skill, { name: 'skill' })
  async getSkill(@Args('id', { type: () => Int }) id: number): Promise<Skill> {
    return this.skillService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Skill)
  async createSkill(
    @Args('createSkillInput') input: CreateSkillInput,
    @Context() ctx,
  ): Promise<Skill> {
    const userId = ctx.user.id;
    return this.skillService.create(input, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Skill)
  async updateSkill(
    @Args('updateSkillInput') input: UpdateSkillInput,
    @Context() ctx,
  ): Promise<Skill> {
    const userId = ctx.user.id;
    return this.skillService.update(input.id, input, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Skill)
  async removeSkill(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Skill> {
    return this.skillService.remove(id);
  }
}
