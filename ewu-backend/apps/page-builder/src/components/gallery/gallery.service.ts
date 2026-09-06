import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { join } from 'path';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { Gallery } from './entities/gallery.entity';
import { CreateGalleryInput, UpdateGalleryInput } from './dto/gallery.input';

@Injectable()
export class GalleryService {
  private logger = new Logger('GalleryService');
  private uploadDir = join(process.env.UPLOAD_DIR, 'gallery', 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
  ) {}

  private async getFileUploadPath(input: any, key: string): Promise<string> {
    let filePath = '';
    if (input[key]) {
      const file: any = await input[key];
      const fileName = `${file.filename}`;
      filePath = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );
    }
    return filePath;
  }

  async create(
    createGalleryInput: CreateGalleryInput,
    userId: number,
  ): Promise<Gallery> {
    try {
      let mediaUrl: string | undefined = null;
      let galleryPhoto: string[] = [];
      if (createGalleryInput?.galleryPhoto) {
        const imagePaths = createGalleryInput?.galleryPhoto.map(
          async (image) => {
            const imageFile: any = await image;
            const fileName = `${imageFile.filename}`;
            const filePath = await uploadFileStream(
              imageFile.createReadStream,
              this.uploadDir,
              fileName,
            );
            return filePath;
          },
        );
        galleryPhoto = await Promise.all(imagePaths);
      }
      if (createGalleryInput?.mediaUrl) {
        mediaUrl = await this.getFileUploadPath(createGalleryInput, 'mediaUrl');
      }

      const newGallery = await this.prisma.gallery.create({
        data: {
          ...createGalleryInput,
          galleryPhoto: {
            create: galleryPhoto?.map((url) => ({
              mediaUrl: url,
              createdBy: userId,
            })),
          },
          mediaUrl,
          createdBy: userId,
        },
        include: { galleryPhoto: true },
      });

      this.logger.log(`Gallery created: ${newGallery.id}`);
      return newGallery;
    } catch (error) {
      throw new HttpException(`Error creating gallery: ${error}`, 500);
    }
  }

  async findAll(page: number, limit: number): Promise<Gallery[]> {
    const skip = (page - 1) * limit;

    return this.prisma.gallery.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { galleryPhoto: true },
    });
  }

  async findOne(id: number): Promise<Gallery> {
    const gallery = await this.prisma.gallery.findUnique({
      where: { id },
      include: { galleryPhoto: true },
    });
    if (!gallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }
    return gallery;
  }

  async update(
    id: number,
    updateGalleryInput: UpdateGalleryInput,
    userId: number,
  ): Promise<Gallery> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException('Gallery not found');

    const updateData = {
      ...updateGalleryInput,
      galleryPhoto: existing?.galleryPhoto,
      mediaUrl: existing?.mediaUrl,
    };

    if (updateGalleryInput?.mediaUrl) {
      if (existing?.mediaUrl) {
        const oldPath = existing.mediaUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(oldPath);
      }
      const file: any = await updateGalleryInput?.mediaUrl;
      const fileName = `${Date.now()}_${file.filename}`;
      const filePath = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );
      updateData.mediaUrl = await filePath;
    }

    if (existing?.galleryPhoto) {
      existing?.galleryPhoto.map(async (photo) => {
        const prevlogofilePath = photo.mediaUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevlogofilePath);
      });
      for (const photo of existing?.galleryPhoto) {
        await this.prisma.galleryPhoto.delete({
          where: {
            id: photo.id,
          },
        });
      }
      updateData.galleryPhoto = [];
    }
    let photos = [];
    if (updateGalleryInput?.galleryPhoto) {
      const imagePaths = updateGalleryInput.galleryPhoto.map(
        async (image, index) => {
          const imageFile: any = await image;
          const fileName = `${Date.now()}_${index}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          return filePath;
        },
      );
      photos = await Promise.all(imagePaths);
    }

    const updated = await this.prisma.gallery.update({
      where: { id },
      data: {
        ...updateData,
        galleryPhoto: {
          deleteMany: {},
          create: photos?.map((url) => ({ mediaUrl: url, updatedBy: userId })),
        },
        updatedBy: userId,
        updateAt: new Date(),
      },
      include: { galleryPhoto: true },
    });

    return updated;
  }

  async remove(id: number): Promise<Gallery> {
    const gallery = await this.findOne(id);

    if (gallery?.mediaUrl) {
      const oldPath = gallery.mediaUrl.replace(`${process.env.BASE_URL}/`, '');
      deleteFileAndDirectory(oldPath);
    }
    if (gallery?.galleryPhoto) {
      gallery?.galleryPhoto.map(async (photo) => {
        const prevlogofilePath = photo.mediaUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevlogofilePath);
      });
    }

    await this.prisma.gallery.delete({ where: { id } });

    return gallery;
  }
}
