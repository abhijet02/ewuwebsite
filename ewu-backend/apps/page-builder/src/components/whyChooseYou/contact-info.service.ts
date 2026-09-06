import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateContactInfoInput,
  UpdateContactInfoInput,
} from '../dto/contact-info.input';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { ContactInfo } from '../entities/contact-info.entity';
import { join } from 'path';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';

@Injectable()
export class ContactInfoService {
  private logger = new Logger('Why Choose - Contact info  service');
  private uploadDir = join(process.env.UPLOAD_DIR, `why-choose`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  // Fetch all contact info records
  async findAll(): Promise<ContactInfo[]> {
    return this.prismaService.contactInfo.findMany({
      include: {
        contents: true, // Include associated content records
        media: true,
      },
    });
  }

  // Fetch a single contact info by ID
  async findOne(id: number): Promise<ContactInfo> {
    const contactInfo = await this.prismaService.contactInfo.findUnique({
      where: { id },
      include: {
        contents: true, // Include associated content records
        media: true,
      },
    });
    if (!contactInfo)
      throw new NotFoundException(`contactInfo with ID ${id} not found`);

    return contactInfo;
  }

  // Create a new contact info
  async create(
    input: CreateContactInfoInput,
    userId: number,
  ): Promise<ContactInfo> {
    let media: string[] = [];
    if (input?.media) {
      const imagePaths = input?.media.map(async (image, index) => {
        const imageFile: any = await image;
        const fileName = `${Date.now()}_${index}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        return filePath;
      });
      media = await Promise.all(imagePaths);
    }

    const contactInfo = await this.prismaService.contactInfo.create({
      data: {
        ...input,
        contents: {
          create: input.contents?.map((c) => ({
            text: c.text,
            header: c.header,
            link: c.link
          })),
        },
        media: {
          create: media?.map((url) => ({ url, createdBy: userId })),
        },
        createdBy: userId,
      },
      include: {
        contents: true,
        media: true,
      },
    });

    return contactInfo;
  }

  // Update an existing contact info
  async update(
    id: number,
    input: UpdateContactInfoInput,
    userId: number,
  ): Promise<ContactInfo> {
    try {
      // Fetch the current content associated with the contact info
      const existingContactInfo = await this.findOne(id);

      const contactInputData = {
        ...input,
        contents: existingContactInfo.contents,
        media: existingContactInfo.media,
      };

      if (input?.contents) {
        if (existingContactInfo?.contents) {
          // delete existing content
          for (const content of existingContactInfo?.contents) {
            await this.prismaService.contactContent.delete({
              where: {
                id: content.id,
              },
            });
          }
        }
      }

      let media: string[] = [];

      if (input?.media) {
        if (existingContactInfo?.media) {
          // Delete exsisting photos to fix duplicate file entry
          for (const m of existingContactInfo.media) {
            await this.prismaService.contactPhoto.delete({
              where: {
                id: m.id,
              },
            });
          }

          existingContactInfo?.media.map(async (photo) => {
            const prevfilePath = photo.url.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevfilePath);
          });
        }

        const imagePaths = input.media.map(async (image, index) => {
          const imageFile: any = await image;
          const fileName = `${Date.now()}_${index}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          return filePath;
        });
        media = await Promise.all(imagePaths);
      }

      // Update or create content
      const updatedContactInfo = await this.prismaService.contactInfo.update({
        where: { id },
        data: {
          ...contactInputData,
          updatedBy: userId,
          contents: {
            create: input.contents.map((c) => ({
              text: c.text,
              header: c.header,
              link: c.link
            })),
          },
          media: {
            create: media.length
              ? media?.map((url) => ({ url, updatedBy: userId }))
              : contactInputData.media,
          },
        },
        include: {
          contents: true, // Include updated content records
          media: true,
        },
      });

      return updatedContactInfo;
    } catch (e) {
      throw new HttpException(`Error Creating News: ${e}`, 500);
    }
  }

  // Delete a contact info by ID
  async remove(id: number): Promise<ContactInfo> {
    const existingContactInfo = await this.findOne(id);
    if (existingContactInfo?.media) {
      // Delete exsisting photos to fix duplicate file entry
      for (const m of existingContactInfo.media) {
        await this.prismaService.contactPhoto.delete({
          where: {
            id: m.id,
          },
        });
      }

      existingContactInfo?.media.map(async (photo) => {
        const prevfilePath = photo.url.replace(`${process.env.BASE_URL}/`, '');
        deleteFileAndDirectory(prevfilePath);
      });
    }
    await this.prismaService.contactInfo.delete({
      where: { id },
    });
    return existingContactInfo;
  }
}
