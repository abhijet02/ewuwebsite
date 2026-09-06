import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Slider } from '../entities/slider.entity';
import { SliderService } from './slider.service';
import { CreateSliderInput } from '../dto/create-slider.input';
import { UpdateSliderInput } from '../dto/update-slider.input';

@Resolver(() => Slider)
export class SliderResolver {
  constructor(private readonly sliderService: SliderService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Slider)
  createSlider(
    @Args('createSliderInput') createSliderInput: CreateSliderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.sliderService.create(createSliderInput, userId);
  }

  @Query(() => [Slider], { name: 'sliders' })
  findAllSlider(@Args('page') page: number, @Args('limit') limit: number) {
    return this.sliderService.findAll(page, limit);
  }

  // ✅ Get a single designation by ID
  @Query(() => Slider, { name: 'slider' })
  findSliderById(@Args('id') id: string) {
    return this.sliderService.findOne(parseInt(id));
  }

  // ✅ Update a designation by ID
  @UseGuards(AuthGuard)
  @Mutation(() => Slider)
  updateSlider(
    @Args('updateSliderInput') updateSliderInput: UpdateSliderInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.sliderService.update(
      updateSliderInput.id,
      updateSliderInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Slider)
  async removeSlider(@Args('id') id: number) {
    return this.sliderService.remove(id);
  }
}
