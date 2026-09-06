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
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreateInqueryInput } from './dto/inquery.input';
import { sendMail } from 'apps/user-service/src/utils/email.util';
import { MailerService } from '@nestjs-modules/mailer';
import {
  componentList,
  InqueryEmailKeyWord,
} from 'apps/user-service/src/utils/component-lis';
import { PrismaPageBuilderService } from '../../../../prisma/prisma-page-builder.service';
import { EwuEmail } from '../email-configuration/entities/ewu-email.entity';

@Injectable()
export class InqueryService {
  private logger = new Logger('Inquery  service');
  private uploadDir = join(process.env.UPLOAD_DIR, `inquery`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
    @Inject(PrismaMasterDataService)
    private prismaService: PrismaMasterDataService,
    private readonly mailService: MailerService,
  ) {}

  async create(createInqueryInput: CreateInqueryInput) {
    try {
      let attachmentUrl = null;
      const emailAttachments = [];

      if (createInqueryInput?.attachmentUrl) {
        attachmentUrl = await getFileUploadPath(
          createInqueryInput,
          'attachmentUrl',
          this.uploadDir,
        );
        // Add the uploaded file to attachments array
        if (attachmentUrl) {
          emailAttachments.push({
            filename: attachmentUrl.split('/').pop() || 'attachment',
            path: attachmentUrl,
          });
        }
      }
      const response = await this.prismaService.inquery.create({
        data: {
          ...createInqueryInput,
          attachmentUrl,
        },
      });
      const {
        message,
        subject,
        email,
        fullName,
        studentEmail,
        studentId,
        phoneNumber,
      } = createInqueryInput;
      if (message && email) {
        const component = await this.prisma.component.findMany({
          where: {
            label: componentList.Inquery,
          },
        });
        const emailContent: EwuEmail[] =
          await this.prismaService.ewuEmail.findMany({
            where: {
              componentId: component[0].id,
            },
          });
        if (emailContent) {
          let htmlString = `${emailContent[0]?.emailBody}`;
          const helpdesk = await this.prismaService.helpDesk.findMany({
            where: {
              email: email,
            },
          });
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${InqueryEmailKeyWord.Message}\\s*}}`, 'g'),
            message || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${InqueryEmailKeyWord.Subject}\\s*}}`, 'g'),
            subject || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${InqueryEmailKeyWord.Email}\\s*}}`, 'g'),
            studentEmail || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${InqueryEmailKeyWord.FullName}\\s*}}`, 'g'),
            fullName || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${InqueryEmailKeyWord.StudentId}\\s*}}`, 'g'),
            studentId || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${InqueryEmailKeyWord.PhoneNumber}\\s*}}`, 'g'),
            phoneNumber || '',
          );
          htmlString = htmlString.replace(
            new RegExp(
              `{{\\s*${InqueryEmailKeyWord.DepartmentName}\\s*}}`,
              'g',
            ),
            helpdesk[0]?.name || '',
          );
          sendMail(
            [email],
            `${emailContent[0]?.emailSubject.replace(
              new RegExp(`{{\\s*${InqueryEmailKeyWord.Subject}\\s*}}`),
              subject || '',
            )}`,
            htmlString,
            this.mailService,
            emailContent[0]?.email || [],
            emailAttachments,
          );
        }
        // const body = `
        //   <strong>Subject</strong>:  New Message from East West University Website Enquery Form.\n\n
        //   Dear Admin,\n\n
        //   You have received a new message from the website contact form.\n
        //   Subject: ${subject}\n
        //   Message:${message}\n\n
        //   Name: ${fullName}\n
        //   Email${studentEmail}\n
        //   Student ID ${studentId}`;
        // const toEmail = email;
        // sendMail(
        //   [toEmail],
        //   'New Message from East West University Website Enquery Form',
        //   body,
        //   this.mailService,
        //   [],
        //   emailAttachments,
        // );
      }
      return response;
    } catch (e) {
      throw new HttpException(`Error creating inquery: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20) {
    const skip = (page - 1) * limit;
    return await this.prismaService.inquery.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.prismaService.inquery.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    try {
      const isInqueryExist = await this.findOne(id);
      if (isInqueryExist) {
        if (isInqueryExist?.attachmentUrl) {
          const prevfilePath = isInqueryExist?.attachmentUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }

        await this.prismaService.inquery.delete({
          where: {
            id,
          },
        });
        return isInqueryExist;
      } else {
        throw new HttpException('Header not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting header: ${e}`, 500);
    }
  }
}
