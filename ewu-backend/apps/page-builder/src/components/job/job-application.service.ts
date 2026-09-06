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
  CreateJobApplicationInput,
  UpdateJobApplicationInput,
} from '../dto/job-application.input';
import { JobApplication } from '../entities/job-application.entity';
import {
  uploadFileStream,
  deleteFileAndDirectory,
} from 'utils/file-upload.util';
import { MailerService } from '@nestjs-modules/mailer';
import { sendMail } from 'apps/user-service/src/utils/email.util';
import { join } from 'path';
import {
  componentList,
  JobApplicationEmailKeyWord,
} from 'apps/user-service/src/utils/component-lis';
import { PrismaMasterDataService } from '../../../../../prisma/prisma-master-data.service';
import { EwuEmail } from 'apps/master-data/src/email-configuration/entities/ewu-email.entity';
import { calculateAge } from 'utils/age-limit.util';

@Injectable()
export class JobApplicationService {
  private logger = new Logger('Job Application Service');
  private uploadDir = join(process.env.UPLOAD_DIR, 'job-application', 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
    @Inject(PrismaMasterDataService)
    private prismaMasterData: PrismaMasterDataService,
    private readonly mailService: MailerService,
  ) {}

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

  private generateApplicationId(serial: number): string {
    const now = new Date();

    const pad2 = (num: number) => num.toString().padStart(2, '0');
    const pad5 = (num: number) => num.toString().padStart(5, '0');

    const year = now.getFullYear();
    const month = pad2(now.getMonth() + 1);
    const day = pad2(now.getDate());
    const hours = pad2(now.getHours());
    const minutes = pad2(now.getMinutes());
    const seconds = pad2(now.getSeconds());

    return `EWU-HR-${year}-${month}-${day}-${hours}${minutes}${seconds}-${pad5(serial)}`;
  }

  async create(input: CreateJobApplicationInput): Promise<JobApplication> {
    try {
      const count = await this.prisma.jobApplication.count();
      const jobApplicationId = this.generateApplicationId(count + 1);

      const cvUrl = await this.getFileUploadPath(input, 'cvUrl');
      const coverLetterUrl = await this.getFileUploadPath(
        input,
        'coverLetterUrl',
      );
      const attachmentUrl = await this.getFileUploadPath(
        input,
        'attachmentUrl',
      );
      const photoUrl = await this.getFileUploadPath(input, 'photoUrl');

      const selctedJob = await this.prisma.job.findUnique({
        where: {
          id: input.jobId,
        },
      });

      if (selctedJob && selctedJob?.ageLimit) {
        const applicantAge = calculateAge(input.dob, selctedJob.ageLimitDate);
        if (selctedJob.ageLimit > applicantAge) {
          throw new HttpException('Age limit exit', HttpStatus.BAD_REQUEST);
        }
      }

      const newApplication = await this.prisma.jobApplication.create({
        data: {
          ...input,
          jobApplicationId,
          cvUrl: cvUrl || undefined,
          coverLetterUrl: coverLetterUrl || undefined,
          attachmentUrl: attachmentUrl || undefined,
          photoUrl: photoUrl || undefined,
        },
      });
      this.logger.log(`Job Application created with ID: ${newApplication.id}`);
      if (newApplication) {
        const component = await this.prisma.component.findMany({
          where: {
            label: componentList.JobApplicationForm,
          },
        });
        const emailAttachments = [];
        if (cvUrl) {
          emailAttachments.push({
            filename: cvUrl.split('/').pop() || 'attachment',
            path: cvUrl,
          });
        }
        if (coverLetterUrl) {
          emailAttachments.push({
            filename: coverLetterUrl.split('/').pop() || 'attachment',
            path: coverLetterUrl,
          });
        }
        if (attachmentUrl) {
          emailAttachments.push({
            filename: attachmentUrl.split('/').pop() || 'attachment',
            path: attachmentUrl,
          });
        }
        if (photoUrl) {
          emailAttachments.push({
            filename: photoUrl.split('/').pop() || 'attachment',
            path: photoUrl,
          });
        }

        const emailContent: EwuEmail[] =
          await this.prismaMasterData.ewuEmail.findMany({
            where: {
              componentId: component[0].id,
            },
          });
        const job = await this.prisma.job.findUnique({
          where: { id: input.jobId },
        });
        if (job && emailContent) {
          let htmlString = `${emailContent[0]?.emailBody}`;
          const jobTitle = job.title;
          const applicantName = newApplication?.name;
          const applicantEmail = newApplication?.email;
          const applicationId = newApplication?.jobApplicationId;
          const applicantMobile = newApplication?.phone;
          const applicationDate = new Date(
            newApplication?.createdAt,
          ).toLocaleDateString('en-GB'); //newApplication?.createdAt
          const department = await this.prismaMasterData.department.findUnique({
            where: { id: job.departmentId },
          });
          const dob = newApplication?.dob;
          // Use regex to replace placeholders safely
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.JobTitle}\\s*}}`,
              'g',
            ),
            jobTitle || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.ApplicantName}\\s*}}`,
              'g',
            ),
            applicantName || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.ApplicantEmail}\\s*}}`,
              'g',
            ),
            applicantEmail || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.ApplicantMobile}\\s*}}`,
              'g',
            ),
            applicantMobile || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.ApplicationId}\\s*}}`,
              'g',
            ),
            applicationId || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.DepartmentName}\\s*}}`,
              'g',
            ),
            department[0]?.name || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.DateOfBirth}\\s*}}`,
              'g',
            ),
            dob?.toDateString() || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${JobApplicationEmailKeyWord.Applicationdate}\\s*}}`,
              'g',
            ),
            applicationDate || '',
          );
          // sendMail(
          //   [job.email],
          //   `${emailContent[0]?.emailSubject}`,
          //   htmlString,
          //   this.mailService,
          //   emailContent[0]?.email || [],
          //   emailAttachments || [],
          // );
          sendMail(
            [newApplication.email],
            `${emailContent[0]?.emailSubject.replace(
              new RegExp(
                `{{\\s*${JobApplicationEmailKeyWord.JobTitle}\\s*}}`,
                'g',
              ),
              jobTitle || '',
            )}`,
            htmlString,
            this.mailService,
            emailContent[0]?.email || [],
            emailAttachments || [],
          );
        }
      }
      return newApplication;
    } catch (e) {
      throw new HttpException(
        `Error creating application: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number, limit: number = 20): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        job: true, // Optional: If you want job details in response
      },
      take: limit,
    });
  }

  async findOne(id: number): Promise<JobApplication> {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
      include: {
        job: true, // Optional
      },
    });
    if (!application)
      throw new NotFoundException(`Application with ID ${id} not found`);
    return application;
  }

  async update(
    id: number,
    input: UpdateJobApplicationInput,
  ): Promise<JobApplication> {
    const existing = await this.findOne(id);

    try {
      let updateData = {
        ...input,
        cvUrl: existing?.cvUrl,
        coverLetterUrl: existing?.coverLetterUrl,
        attachmentUrl: existing?.attachmentUrl,
        photoUrl: existing?.photoUrl,
      };

      if (input?.cvUrl) {
        if (existing?.cvUrl) {
          const previousFilePath = existing?.cvUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(previousFilePath);
        }
        updateData.cvUrl = await this.getFileUploadPath(input, 'cvUrl');
      }

      if (input?.coverLetterUrl) {
        if (existing?.coverLetterUrl) {
          const previousFilePath = existing?.coverLetterUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(previousFilePath);
        }
        updateData.coverLetterUrl = await this.getFileUploadPath(
          input,
          'coverLetterUrl',
        );
      }

      if (input?.attachmentUrl) {
        if (existing?.attachmentUrl) {
          const previousFilePath = existing?.attachmentUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(previousFilePath);
        }
        updateData.attachmentUrl = await this.getFileUploadPath(
          input,
          'attachmentUrl',
        );
      }
      if (input?.photoUrl) {
        if (existing?.photoUrl) {
          const previousFilePath = existing?.photoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(previousFilePath);
        }
        updateData.photoUrl = await this.getFileUploadPath(input, 'photoUrl');
      }

      const updated = await this.prisma.jobApplication.update({
        where: { id },
        data: {
          ...updateData,
        },
      });

      return updated;
    } catch (e) {
      throw new HttpException(
        `Error updating application: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<JobApplication> {
    const existing = await this.findOne(id);

    try {
      await this.prisma.jobApplication.delete({ where: { id } });

      if (existing?.cvUrl) {
        const previousFilePath = existing.cvUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(previousFilePath);
      }

      if (existing?.coverLetterUrl) {
        const previousFilePath = existing.coverLetterUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(previousFilePath);
      }

      if (existing?.photoUrl) {
        const previousFilePath = existing.photoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(previousFilePath);
      }

      if (existing?.attachmentUrl) {
        const previousFilePath = existing.attachmentUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(previousFilePath);
      }

      return existing;
    } catch (e) {
      throw new HttpException(
        `Error deleting application: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
