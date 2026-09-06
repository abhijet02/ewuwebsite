import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OfficeService } from './office.service';
import { Office } from './entities/office.entity';
import { CreateOfficeInput } from './dto/office.input';
import { UpdateOfficeInput } from './dto/office.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';

@Resolver(() => Office)
export class OfficeResolver {
  constructor(private readonly officeService: OfficeService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Office)
  createOffice(
    @Args('createOfficeInput') createOfficeInput: CreateOfficeInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeService.create(createOfficeInput, userId);
  }

  @Query(() => [Office], { name: 'offices' })
  findAll(@Args('page') page: number, @Args('limit') limit: number) {
    return this.officeService.findAll(page, limit);
  }

  @Query(() => Office, { name: 'office' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.officeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Office)
  updateOffice(
    @Args('updateOfficeInput') updateOfficeInput: UpdateOfficeInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.officeService.update(
      updateOfficeInput.id,
      updateOfficeInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Office)
  removeOffice(@Args('id', { type: () => Int }) id: number) {
    return this.officeService.remove(id);
  }
}
