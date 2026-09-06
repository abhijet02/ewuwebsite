import { UseGuards } from "@nestjs/common";
import { Mutation, Args, Context, Int, Resolver, Query } from "@nestjs/graphql";
import { CreateYearlyViewInput, UpdateYearlyViewInput } from "../dto/yearly-view-component.input";
import { YearlyViewComponent } from "../entities/yearly-view-component.entity";
import { YearlyViewComponentService } from "./yearly-view-component.service";
import { AuthGuard } from "apps/user-service/src/guard/auth.guard";

@Resolver(() => YearlyViewComponent)
export class YearlyViewComponentResolver {
  constructor(private readonly service: YearlyViewComponentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => YearlyViewComponent)
  createYearlyView(
    @Args('createYearlyViewInput') input: CreateYearlyViewInput,
    @Context() ctx,
  ) {
    return this.service.create(input, ctx.user.id);
  }

  @Query(() => [YearlyViewComponent])
  yearlyViews(@Args('page') page:number, @Args('limit') limit:number) {
    return this.service.findAll(page, limit);
  }

  @Query(() => YearlyViewComponent)
  yearlyView(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

   @UseGuards(AuthGuard)
    @Mutation(() => YearlyViewComponent)
    updateYearlyView(
    @Args('updateYearlyViewInput') input: UpdateYearlyViewInput,
    @Context() ctx,
    ) {
    return this.service.update(input, ctx.user.id);
   }


  @UseGuards(AuthGuard)
  @Mutation(() => YearlyViewComponent)
  removeYearlyView(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
