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
import { CreateFooterInput, UpdateFooterInput } from '../dto/footer.input';

@Injectable()
export class FooterService {
  private logger = new Logger('Footer  service');
  private uploadDir = join(process.env.UPLOAD_DIR, `footer`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(createFooterInput: CreateFooterInput, userId: number) {
    try {
      let footerLogoUrl = null;
      if (createFooterInput?.footerLogoUrl) {
        footerLogoUrl = await getFileUploadPath(
          createFooterInput,
          'footerLogoUrl',
          this.uploadDir,
        );
      }
      let footerMediaUrl = null;
      if (createFooterInput?.footerMediaUrl) {
        footerMediaUrl = await getFileUploadPath(
          createFooterInput,
          'footerMediaUrl',
          this.uploadDir,
        );
      }
      let footerMap = null;
      if (createFooterInput?.footerMap) {
        footerMap = await getFileUploadPath(
          createFooterInput,
          'footerMap',
          this.uploadDir,
        );
      }
      const response = await this.prismaService.footer.create({
        data: {
          ...createFooterInput,
          footerLogoUrl,
          footerMediaUrl,
          footerMap,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating footer: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20) {
    return await this.prismaService.footer.findMany({ take: limit });
  }

  async findOne(id: number) {
    return await this.prismaService.footer.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateFooterInput: UpdateFooterInput,
    userId: number,
  ) {
    const isFooterExist = await this.prismaService.footer.findUnique({
      where: {
        id,
      },
    });
    if (isFooterExist) {
      let updateFooterInputData = {
        ...updateFooterInput,
        footerLogoUrl: isFooterExist.footerLogoUrl,
        footerMediaUrl: isFooterExist.footerMediaUrl,
        footerMap: isFooterExist.footerMap,
      };
      if (updateFooterInput?.footerLogoUrl) {
        if (isFooterExist?.footerLogoUrl) {
          const prevfilePath = isFooterExist?.footerLogoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        const footerLogoUrl = await getFileUploadPath(
          updateFooterInput,
          'footerLogoUrl',
          this.uploadDir,
        );
        updateFooterInputData = {
          ...updateFooterInputData,
          footerLogoUrl,
        };
      }
      if (updateFooterInput?.footerMediaUrl) {
        if (isFooterExist?.footerMediaUrl) {
          const prevfilePath = isFooterExist?.footerMediaUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }

        const footerMediaUrl = await getFileUploadPath(
          updateFooterInput,
          'footerMediaUrl',
          this.uploadDir,
        );
        updateFooterInputData = {
          ...updateFooterInputData,
          footerMediaUrl,
        };
      }
      if (updateFooterInput?.footerMap) {
        if (isFooterExist?.footerMap) {
          const prevfilePath = isFooterExist?.footerMap.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }

        const footerMap = await getFileUploadPath(
          updateFooterInput,
          'footerMap',
          this.uploadDir,
        );
        updateFooterInputData = {
          ...updateFooterInputData,
          footerMap,
        };
      }
      const updatedFooterItem = await this.prismaService.footer.update({
        data: {
          ...updateFooterInputData,
          updatedBy: userId,
        },
        where: {
          id,
        },
      });
      return updatedFooterItem;
    } else {
      throw new HttpException('Footer not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isFooterExist = await this.prismaService.footer.findUnique({
        where: {
          id,
        },
      });
      if (isFooterExist) {
        if (isFooterExist?.footerLogoUrl) {
          const prevfilePath = isFooterExist?.footerLogoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        if (isFooterExist?.footerMediaUrl) {
          const prevfilePath = isFooterExist?.footerMediaUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        if (isFooterExist?.footerMap) {
          const prevfilePath = isFooterExist?.footerMap.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        await this.prismaService.footer.delete({
          where: {
            id,
          },
        });
        return isFooterExist;
      } else {
        throw new HttpException('Footer not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting footer: ${e}`, 500);
    }
  }
}
