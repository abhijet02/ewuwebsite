import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  deleteFileAndDirectory,
  getFileUploadPath,
} from 'utils/file-upload.util';
import { join } from 'path';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateHeaderInput, UpdateHeaderInput } from '../dto/header.input';

@Injectable()
export class HeaderService {
  private logger = new Logger('Header  service');
  private uploadDir = join(process.env.UPLOAD_DIR, `header`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(createHeaderInput: CreateHeaderInput, userId: number) {
    try {
      let headerLogoUrl = null;
      if (createHeaderInput?.headerLogoUrl) {
        headerLogoUrl = await getFileUploadPath(
          createHeaderInput,
          'headerLogoUrl',
          this.uploadDir,
        );
      }
      const response = await this.prismaService.header.create({
        data: {
          ...createHeaderInput,
          headerLogoUrl,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating header: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20) {
    return await this.prismaService.header.findMany({ take: limit });
  }

  async findOne(id: number) {
    return await this.prismaService.header.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateHeaderInput: UpdateHeaderInput,
    userId: number,
  ) {
    const isHeaderExist = await this.findOne(id);
    if (isHeaderExist) {
      let updateHeaderInputData = {
        ...updateHeaderInput,
        headerLogoUrl: isHeaderExist.headerLogoUrl,
      };
      if (updateHeaderInput?.headerLogoUrl) {
        if (isHeaderExist?.headerLogoUrl) {
          const prevfilePath = isHeaderExist?.headerLogoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }

        const headerLogoUrl = await getFileUploadPath(
          updateHeaderInput,
          'headerLogoUrl',
          this.uploadDir,
        );
        updateHeaderInputData = {
          ...updateHeaderInputData,
          headerLogoUrl,
        };
      }

      const updatedHeaderItem = await this.prismaService.header.update({
        data: {
          ...updateHeaderInputData,
          updatedBy: userId,
        },
        where: {
          id,
        },
      });
      return updatedHeaderItem;
    } else {
      throw new HttpException('Header not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isMenuExist = await this.prismaService.header.findUnique({
        where: {
          id,
        },
      });
      if (isMenuExist) {
        if (isMenuExist?.headerLogoUrl) {
          const prevfilePath = isMenuExist?.headerLogoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }

        await this.prismaService.header.delete({
          where: {
            id,
          },
        });
        return isMenuExist;
      } else {
        throw new HttpException('Header not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting header: ${e}`, 500);
    }
  }
}
