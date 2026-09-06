import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { Gallery } from './entities/gallery.entity';
import { GalleryService } from './gallery.service';
import { CreateGalleryInput, UpdateGalleryInput } from './dto/gallery.input';

@Resolver(() => Gallery)
export class GalleryResolver {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Gallery)
  createGallery(
    @Args('createGalleryInput') createGalleryInput: CreateGalleryInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.galleryService.create(createGalleryInput, userId);
  }

  @Query(() => [Gallery], { name: 'galleries' })
  findAllGalleries(@Args('page') page: number, @Args('limit') limit: number) {
    return this.galleryService.findAll(page, limit);
  }

  @Query(() => Gallery, { name: 'gallery' })
  findGalleryById(@Args('id') id: number) {
    return this.galleryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Gallery)
  updateGallery(
    @Args('updateGalleryInput') updateGalleryInput: UpdateGalleryInput,
    @Context() ctx,
  ) {
    const userId = ctx.user.id;
    return this.galleryService.update(
      updateGalleryInput.id,
      updateGalleryInput,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Gallery)
  removeGallery(@Args('id') id: number) {
    return this.galleryService.remove(id);
  }
}
