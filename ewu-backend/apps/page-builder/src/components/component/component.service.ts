import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateComponentInput } from '../dto/create-component.input';
import { join } from 'path';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'apps/user-service/src/utils/file-upload.util';
import { UpdateComponentInput } from '../dto/update-component.input';
import { Component } from '../entities/component.entity';

@Injectable()
export class ComponentService {
  private logger = new Logger('Component service');

  private uploadDir = join(process.env.UPLOAD_DIR, `notice`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(createComponentInput: CreateComponentInput) {
    try {
      let thumbnailUrl = null;
      if (createComponentInput.thumbnailPath) {
        const thumbnailFile: any = await createComponentInput.thumbnailPath;
        const thumbnailFileName = `${Date.now()}_${thumbnailFile.filename}`;
        const thumbnailFilePath = await uploadFileStream(
          thumbnailFile.createReadStream,
          this.uploadDir,
          thumbnailFileName,
        );
        thumbnailUrl = thumbnailFilePath;
      }

      const createdComponent = this.prismaService.component.create({
        data: {
          ...createComponentInput,
          thumbnailPath: thumbnailUrl,
        },
      });
      this.logger.log(`created component ${createdComponent}`);
      return createdComponent;
    } catch (e) {
      throw new HttpException(`Error Creating Component: ${e}`, 500);
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    try {
      return await this.prismaService.component.findMany({
        skip,
        take: limit,
        //orderBy: { createdAt: 'desc' },
      });
      // const [components, total] = await this.prismaService.$transaction([
      //   this.prismaService.component.findMany({
      //     skip,
      //     take: limit,
      //     orderBy: { createdAt: 'desc' },
      //   }),
      //   this.prismaService.component.count(),
      // ]);

      // return {
      //   data: components,
      //   total,
      //   page,
      //   totalPages: Math.ceil(total / limit),
      // };
    } catch (error) {
      throw new HttpException(
        `Error fetching Component list: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    return this.prismaService.component.findUnique({ where: { id } });
  }

  async update(id: number, updateComponentInput: UpdateComponentInput) {
    try {
      const isComponentExist: Component =
        await this.prismaService.component.findUnique({
          where: {
            id,
          },
        });
      if (isComponentExist) {
        let componentInputData = {
          ...updateComponentInput,
          thumbnailPath: isComponentExist.thumbnailPath,
        };
        if (updateComponentInput?.thumbnailPath) {
          if (isComponentExist.thumbnailPath) {
            const prevlogofilePath = isComponentExist.thumbnailPath.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevlogofilePath);
          }
          const imageFile: any = await updateComponentInput.thumbnailPath;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          componentInputData = {
            ...componentInputData,
            thumbnailPath: await filePath,
          };
        }

        const updatedComponentData = await this.prismaService.component.update({
          data: {
            ...componentInputData,
          },
          where: {
            id,
          },
        });
        return updatedComponentData;
      }
    } catch (e) {
      throw new HttpException(`Error Upadting Component: ${e}`, 500);
    }
  }

  async remove(id: number) {
    try {
      const isComponentExist: Component =
        await this.prismaService.component.findUnique({
          where: {
            id,
          },
        });
      if (isComponentExist) {
        if (isComponentExist.thumbnailPath) {
          const prevlogofilePath = isComponentExist.thumbnailPath.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevlogofilePath);
        }

        const deletedComponent = await this.prismaService.component.delete({
          where: { id },
        });
        return deletedComponent;
      } else {
        throw new HttpException('Component not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(
        `Error Deleted Component: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
