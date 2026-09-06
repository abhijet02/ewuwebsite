import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateJobInput, UpdateJobInput } from '../dto/job.input';
import { Job } from '../entities/job.entity';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';
import { deleteFileAndDirectory, uploadFileStream } from 'apps/user-service/src/utils/file-upload.util';
import { join } from 'path';


@Injectable()
export class JobService {
  private logger = new Logger('Job Service');
  private uploadDir = join(process.env.UPLOAD_DIR, 'job', 'files');
  

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
  ) {}

  async archiveExpiredJobs(): Promise<void> {
    const now = new Date();
    await this.prisma.job.updateMany({
      where: {
        deadline: { lt: now },
        isArchived: YesOrNo.NO,
      },
      data: {
        isArchived: YesOrNo.YES,
      },
    });
  }

    async getFileUploadPath(input: any, key: string): Promise<string> {
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

  async create(input: CreateJobInput, userId: number): Promise<Job> {
    try {
      const jobCircularUrl = await this.getFileUploadPath(
        input,
        'jobCircularUrl',
      );
      const newJob = await this.prisma.job.create({
        data: {
          ...input,
          jobCircularUrl: jobCircularUrl || undefined,
          createdBy: userId,
        },
      });
      this.logger.log(`Job created with ID: ${newJob.id}`);
      return newJob;
    } catch (e) {
      throw new HttpException(
        `Error creating job: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number, limit: number = 20): Promise<Job[]> {
    await this.archiveExpiredJobs(); // Archive expired jobs first
    return this.prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async findOne(id: number): Promise<Job> {
    await this.archiveExpiredJobs(); // Archive expired jobs first
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException(`Job with ID ${id} not found`);
    return job;
  }

  async update(
    id: number,
    input: UpdateJobInput,
    userId: number,
  ): Promise<Job> {
    const existingJob = await this.prisma.job.findUnique({ where: { id } });
    if (!existingJob) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    try {
      let updateData = {
          ...input,
          jobCircularUrl: existingJob?.jobCircularUrl,
        };
  
        if (input?.jobCircularUrl) {
          if (existingJob?.jobCircularUrl) {
            const previousFilePath = existingJob.jobCircularUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(previousFilePath);
          }
          updateData.jobCircularUrl = await this.getFileUploadPath(input, 'jobCircularUrl');
        }
      const updated = await this.prisma.job.update({
        data: {
          ...updateData,
          updatedBy: userId,
        },
        where: { id },
      });
      return updated;
    } catch (e) {
      throw new HttpException(
        `Error updating job: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Job> {
    const job = await this.findOne(id);
    try {
      if (job?.jobCircularUrl) {
          const previousFilePath = job.jobCircularUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(previousFilePath);
        }
      await this.prisma.job.delete({ where: { id } });
      return job;
    } catch (e) {
      throw new HttpException(
        `Error deleting job: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
