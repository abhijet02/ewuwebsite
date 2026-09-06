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
import { FeedbackOfStudent } from './entities/feedback-of-student.entity';
import { CreateFeedbackOfStudentInput } from './dto/create-feedback-of-student.input';
import { UpdateFeedbackOfStudentInput } from './dto/update-feedback-f-student.input';

@Injectable()
export class FeedbackOfStudentService {
  private logger = new Logger('Feedback Of Student  service');
  //
  private uploadDir = join(process.env.UPLOAD_DIR, `feedback`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(
    createFeedbackOfStudentInput: CreateFeedbackOfStudentInput,
    userId: number,
  ): Promise<FeedbackOfStudent> {
    try {
      let photoUrl = null;
      let attachmentUrl = null;
      if (createFeedbackOfStudentInput?.attachmentUrl) {
        const attachmentFile: any = await createFeedbackOfStudentInput.attachmentUrl;
        const attachmentFileName = `${Date.now()}_${attachmentFile.filename}`;
        const attachmentFilePath = await uploadFileStream(
          attachmentFile.createReadStream,
          this.uploadDir,
          attachmentFileName,
        );

        attachmentUrl = await attachmentFilePath;
      }
      if (createFeedbackOfStudentInput?.photoUrl) {
        const thumbnailFile: any = await createFeedbackOfStudentInput.photoUrl;
        const thumbnailFileName = `${Date.now()}_${thumbnailFile.filename}`;
        const thumbnailFilePath = await uploadFileStream(
          thumbnailFile.createReadStream,
          this.uploadDir,
          thumbnailFileName,
        );

        photoUrl = await thumbnailFilePath;
      }

      const createdfeedbackdata = this.prismaService.feedbackofStudent.create({
        data: {
          ...createFeedbackOfStudentInput,
          photoUrl,
          attachmentUrl,
          createdBy: userId,
        },
      });

      this.logger.log(`FeedbackOfStudent Data: ${createdfeedbackdata}`);
      return createdfeedbackdata;
    } catch (e) {
      throw new HttpException(`Error Creating FeedbackOfStudent: ${e}`, 500);
    }
  }

  async findAll(page, limit): Promise<FeedbackOfStudent[]> {
    return this.prismaService.feedbackofStudent.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<FeedbackOfStudent> {
    const news = await this.prismaService.feedbackofStudent.findUnique({
      where: { id },
    });

    if (!news)
      throw new NotFoundException(`FeedbackofStudent with ID ${id} not found`);

    return news;
  }

  async update(
    id: number,
    updateFeedbackOfStudentInput: UpdateFeedbackOfStudentInput,
    userId: number,
  ): Promise<FeedbackOfStudent> {
    try {
      const isFeedbackExist: FeedbackOfStudent =
        await this.prismaService.feedbackofStudent.findUnique({
          where: {
            id,
          },
        });
      if (isFeedbackExist) {
        let feedbackInputData = {
          ...updateFeedbackOfStudentInput,
          photoUrl: isFeedbackExist.photoUrl,
          attachmentUrl: isFeedbackExist.attachmentUrl
        };

        if (updateFeedbackOfStudentInput?.photoUrl) {
          if (isFeedbackExist?.photoUrl) {
            const prevthumbnailfilePath = isFeedbackExist.photoUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevthumbnailfilePath);
          }
          const imageFile: any = await updateFeedbackOfStudentInput.photoUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          feedbackInputData = {
            ...feedbackInputData,
            photoUrl: await filePath,
          };
        }

        if (updateFeedbackOfStudentInput?.attachmentUrl) {
          if (isFeedbackExist?.attachmentUrl) {
            const prevthumbnailfilePath = isFeedbackExist.attachmentUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevthumbnailfilePath);
          }
          const imageFile: any = await updateFeedbackOfStudentInput.attachmentUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          feedbackInputData = {
            ...feedbackInputData,
            attachmentUrl: await filePath,
          };
        }

        const updatedFeedbackData =
          await this.prismaService.feedbackofStudent.update({
            data: {
              ...feedbackInputData,
              updatedBy: userId,
            },
            where: {
              id,
            },
          });
        return updatedFeedbackData;
      } else {
        throw new HttpException(
          'feedbackofStudent not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Updating feedbackofStudent: ${e}`, 500);
    }
  }

  async delete(id: number): Promise<FeedbackOfStudent> {
    const isFeedbackExist = await this.findOne(id); // Ensure the notice exists
    if (isFeedbackExist) {
      await this.prismaService.feedbackofStudent.delete({ where: { id } });
      if (isFeedbackExist?.photoUrl) {
        const prevthumbnailfilePath = isFeedbackExist.photoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevthumbnailfilePath);
      }

      if (isFeedbackExist?.attachmentUrl) {
        const prevthumbnailfilePath = isFeedbackExist.attachmentUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevthumbnailfilePath);
      }

      return isFeedbackExist;
    } else {
      throw new HttpException(
        'FeedbackOfStudent not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
