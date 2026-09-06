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
import { SemesterCalender } from './entities/semester-calender.entity';
import { CreateSemesterCalenderInput } from './dto/create-semester-calender.input';
import { UpdateSemesterCalenderInput } from './dto/update-semester-calender.input';

@Injectable()
export class SemesterCalenderService {
  private logger = new Logger('Semester Calender  service');

  private uploadDir = join(process.env.UPLOAD_DIR, `semester`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(
    createSemesterCalenderInput: CreateSemesterCalenderInput,
    userId: number,
  ): Promise<SemesterCalender> {
    try {
      let attachmentUrl = null
      if(createSemesterCalenderInput?.attachmentUrl){
        const imageFile: any = await createSemesterCalenderInput?.attachmentUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        attachmentUrl = await filePath;
      }
      const createdSemesterCalenderdata =
        this.prismaService.semesterCalender.create({
          data: {
            ...createSemesterCalenderInput,
            attachmentUrl,
            createdBy: userId,
          },
        });

      this.logger.log(
        `Latest semester Calender Data: ${createdSemesterCalenderdata}`,
      );
      return createdSemesterCalenderdata;
    } catch (e) {
      throw new HttpException(`Error semester Calender Type: ${e}`, 500);
    }
  }

  async findAll(page, limit): Promise<SemesterCalender[]> {
    return this.prismaService.semesterCalender.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<SemesterCalender> {
    const semesterCalender =
      await this.prismaService.semesterCalender.findUnique({
        where: { id },
      });
    if (!semesterCalender)
      throw new NotFoundException(`SemesterCalender with ID ${id} not found`);
    return semesterCalender;
  }

  async update(
    id: number,
    updateSemesterCalenderInput: UpdateSemesterCalenderInput,
    userId: number,
  ): Promise<SemesterCalender> {
    try {
      const isSemesterCalenderExist: SemesterCalender =
        await this.prismaService.semesterCalender.findUnique({
          where: {
            id,
          },
        });
      if (isSemesterCalenderExist) {
        let attachmentInputData = {
          ...updateSemesterCalenderInput,
          attachmentUrl: isSemesterCalenderExist.attachmentUrl,
        };
        if (updateSemesterCalenderInput?.attachmentUrl) {
          if (isSemesterCalenderExist.attachmentUrl) {
            const prevAcademyfilePath =
              isSemesterCalenderExist.attachmentUrl.replace(
                `${process.env.BASE_URL}/`,
                '',
              );
            deleteFileAndDirectory(prevAcademyfilePath);
          }
          const imageFile: any =
            await updateSemesterCalenderInput.attachmentUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          attachmentInputData = {
            ...updateSemesterCalenderInput,
            attachmentUrl: await filePath,
          };
        }

        const updatedSemesterCalenderInputData =
          await this.prismaService.semesterCalender.update({
            data: {
              ...attachmentInputData,
              updatedBy: userId,
            },
            where: {
              id,
            },
          });
        return updatedSemesterCalenderInputData;
      } else {
        throw new HttpException(
          'AcademyType not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Updating AcademyType: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<SemesterCalender> {
    try {
      const isSemesterCalenderExist: SemesterCalender = await this.findOne(id); // Ensure the notice exists
      if (isSemesterCalenderExist) {
        await this.prismaService.semesterCalender.delete({ where: { id } });
        if (isSemesterCalenderExist.attachmentUrl) {
          const prevAcademyfilePath =
            isSemesterCalenderExist.attachmentUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
          deleteFileAndDirectory(prevAcademyfilePath);
        }

        return isSemesterCalenderExist;
      }
    } catch (e) {
      throw new HttpException(`Error Updating AcademyType: ${e}`, 500);
    }
  }
}
