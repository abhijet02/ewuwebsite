import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';

import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { CreateClubInput, UpdateClubInput } from './dto/club.input';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubService {
  private logger = new Logger('Club  service');
  //
  private uploadDir = join(process.env.UPLOAD_DIR, `club`, 'files');

  constructor(
    @Inject(PrismaMasterDataService)
    private prismaService: PrismaMasterDataService,
  ) {}

  async create(
    createClubInput: CreateClubInput,
    userId: number,
  ): Promise<Club> {
    try {
      let logoUrl = null;
      if (createClubInput?.logoUrl) {
        const logoFile: any = await createClubInput.logoUrl;
        const logoFileName = `${Date.now()}_${logoFile.filename}`;
        const logoFilePath = await uploadFileStream(
          logoFile.createReadStream,
          this.uploadDir,
          logoFileName,
        );

        logoUrl = await logoFilePath;
      }

      const createdfeedbackdata = this.prismaService.club.create({
        data: {
          ...createClubInput,
          logoUrl,
          createdBy: userId,
        },
      });

      this.logger.log(`Club Data: ${createdfeedbackdata}`);
      return createdfeedbackdata;
    } catch (e) {
      throw new HttpException(`Error Creating Club: ${e}`, 500);
    }
  }

  async findAll(page, limit): Promise<Club[]> {
    return this.prismaService.club.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  async findOne(id: number): Promise<Club> {
    const club = await this.prismaService.club.findUnique({
      where: { id },
    });

    if (!club) throw new NotFoundException(`Club with ID ${id} not found`);

    return club;
  }

  async update(
    id: number,
    updateClubInput: UpdateClubInput,
    userId: number,
  ): Promise<Club> {
    try {
      const isClubExist: Club = await this.findOne(id);
      if (isClubExist) {
        let clubInputData = {
          ...updateClubInput,
          logoUrl: isClubExist.logoUrl,
        };

        if (updateClubInput?.logoUrl) {
          if (isClubExist?.logoUrl) {
            const prevthumbnailfilePath = isClubExist.logoUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevthumbnailfilePath);
          }
          const imageFile: any = await updateClubInput.logoUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          clubInputData = {
            ...clubInputData,
            logoUrl: await filePath,
          };
        }

        const updatedClubData = await this.prismaService.club.update({
          data: {
            ...clubInputData,
            updatedBy: userId,
          },
          where: {
            id,
          },
        });
        return updatedClubData;
      } else {
        throw new HttpException('Club not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Club: ${e}`, 500);
    }
  }

  async delete(id: number): Promise<Club> {
    const isClubExist = await this.findOne(id); // Ensure the notice exists
    if (isClubExist) {
      await this.prismaService.club.delete({ where: { id } });
      if (isClubExist?.logoUrl) {
        const prevthumbnailfilePath = isClubExist.logoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevthumbnailfilePath);
      }

      return isClubExist;
    } else {
      throw new HttpException('Club not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
