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
import { CampusLife } from './entities/campus-life.entity';
import {
  CreateCampusLifeInput,
  UpdateCampusLifeInput,
} from './dto/campus-life.input';

@Injectable()
export class CampusLifeService {
  private logger = new Logger('CampusLifeService');
  private uploadDir = join(process.env.UPLOAD_DIR, 'campus', 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
  ) {}

  private async getFileUploadPath(input: any, key: string): Promise<string> {
    let filePath = '';
    if (input[key]) {
      const file: any = await input[key];
      const fileName = `${Date.now()}_${file.filename}`;
      filePath = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );
    }
    return filePath;
  }

  async create(
    createCampusLifeInput: CreateCampusLifeInput,
    userId: number,
  ): Promise<CampusLife> {
    try {
      let mediaUrl: string = null;
      if (createCampusLifeInput?.mediaUrl) {
        mediaUrl = await this.getFileUploadPath(
          createCampusLifeInput,
          'mediaUrl',
        );
      }

      const newCampusLife = await this.prisma.campusLife.create({
        data: {
          ...createCampusLifeInput,
          mediaUrl,
          createdBy: userId,
        },
      });

      this.logger.log(`Campus Life Content created: ${newCampusLife.id}`);
      return newCampusLife;
    } catch (error) {
      throw new HttpException(
        `Error creating Campus Life Content : ${error}`,
        500,
      );
    }
  }

  async findAll(page: number, limit: number): Promise<CampusLife[]> {
    const skip = (page - 1) * limit;

    return this.prisma.campusLife.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<CampusLife> {
    const campusLife = await this.prisma.campusLife.findUnique({
      where: { id },
    });
    if (!campusLife) {
      throw new NotFoundException(
        `campus Life content  with ID ${id} not found`,
      );
    }
    return campusLife;
  }

  async update(
    id: number,
    updateCampusLifeInput: UpdateCampusLifeInput,
    userId: number,
  ): Promise<CampusLife> {
    const existing = await this.prisma.campusLife.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('campus Life content not found');

    const updateData = {
      ...updateCampusLifeInput,
      mediaUrl: existing.mediaUrl,
    };

    if (updateCampusLifeInput?.mediaUrl) {
      if (existing.mediaUrl) {
        const oldPath = existing.mediaUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(oldPath);
      }
      const file: any = await updateCampusLifeInput?.mediaUrl;
      const fileName = `${Date.now()}_${file.filename}`;
      const filePath = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );
      updateData.mediaUrl = filePath;
    }

    const updated = await this.prisma.campusLife.update({
      where: { id },
      data: {
        ...updateData,
        updatedBy: userId,
        updateAt: new Date(),
      },
    });

    return updated;
  }

  async remove(id: number): Promise<CampusLife> {
    const campusLife = await this.findOne(id);

    if (campusLife.mediaUrl) {
      const oldPath = campusLife.mediaUrl.replace(
        `${process.env.BASE_URL}/`,
        '',
      );
      deleteFileAndDirectory(oldPath);
    }

    await this.prisma.campusLife.delete({ where: { id } });

    return campusLife;
  }
}
