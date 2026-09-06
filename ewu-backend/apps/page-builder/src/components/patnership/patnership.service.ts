import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';

import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { CreatePatnershipInput } from './dto/create-patnership.input';
import { Patnership } from './entities/patnership.entity';
import { UpdatePatnershipInput } from './dto/update-patnership.input';

@Injectable()
export class PatnershipService {
  private logger = new Logger('Patnership  service');

  private uploadDir = join(process.env.UPLOAD_DIR, `patnership`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(
    createPatnershipInput: CreatePatnershipInput,
    userId: number,
  ): Promise<Patnership> {
    try {
      const imageFile: any = await createPatnershipInput?.logoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      const logoUrl = await filePath;
      const createdPatnershipdata = this.prismaService.patnership.create({
        data: {
          ...createPatnershipInput,
          logoUrl,
          createdBy: userId,
        },
      });

      this.logger.log(`Patnership Data: ${createdPatnershipdata}`);
      return createdPatnershipdata;
    } catch (e) {
      throw new HttpException(`Error Creating Patnership: ${e}`, 500);
    }
  }

  async findAll(page, limit): Promise<Patnership[]> {
    return this.prismaService.patnership.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Patnership> {
    const slider = await this.prismaService.patnership.findUnique({
      where: { id },
    });
    if (!slider)
      throw new NotFoundException(`Patnership with ID ${id} not found`);
    return slider;
  }

  async update(
    id: number,
    updatePatnershipInput: UpdatePatnershipInput,
    userId: number,
  ): Promise<Patnership> {
    try {
      const isPatnershipExist: Patnership =
        await this.prismaService.patnership.findUnique({
          where: {
            id,
          },
        });
      if (isPatnershipExist) {
        let patnershipInputData = {
          ...updatePatnershipInput,
          logoUrl: isPatnershipExist.logoUrl,
        };
        if (updatePatnershipInput?.logoUrl) {
          if (isPatnershipExist.logoUrl) {
            const prevPatnershipfilePath = isPatnershipExist.logoUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevPatnershipfilePath);
          }
          const imageFile: any = await updatePatnershipInput.logoUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          patnershipInputData = {
            ...patnershipInputData,
            logoUrl: await filePath,
          };
        }

        const updatedPatnershipData =
          await this.prismaService.patnership.update({
            data: {
              ...patnershipInputData,
              updatedBy: userId,
            },
            where: {
              id,
            },
          });
        return updatedPatnershipData;
      } else {
        throw new HttpException('Patnership not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Patnership: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<Patnership> {
    try {
      const isPatnershipExist: Patnership = await this.findOne(id); // Ensure the notice exists
      if (isPatnershipExist) {
        await this.prismaService.patnership.delete({ where: { id } });
        if (isPatnershipExist.logoUrl) {
          const prevPatnershipfilePath = isPatnershipExist.logoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPatnershipfilePath);
        }
        return isPatnershipExist;
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Patnership: ${e}`, 500);
    }
  }
}
