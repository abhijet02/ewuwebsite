import {
  Injectable,
  Inject,
  NotFoundException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { join } from 'path';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import {
  uploadFileStream,
  deleteFileAndDirectory,
} from 'utils/file-upload.util';
import {
  CreateYearlyViewAttachmentInput,
  CreateYearlyViewInput,
  UpdateYearlyViewInput,
} from '../dto/yearly-view-component.input';
import { YearlyViewAttachment } from '../entities/yearly-view-component.entity';
import { PrismaMasterDataService } from '../../../../../prisma/prisma-master-data.service';
import { componentList } from 'apps/user-service/src/utils/component-lis';
import { MailerService } from '@nestjs-modules/mailer';
import { sendMail } from 'apps/user-service/src/utils/email.util';
import { EwuEmail } from 'apps/master-data/src/email-configuration/entities/ewu-email.entity';

@Injectable()
export class YearlyViewComponentService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'yearly-view', 'files');
  private logger = new Logger('Club Activity Ranking  service');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
    @Inject(PrismaMasterDataService)
    private prismaMasterData: PrismaMasterDataService,
    private readonly mailService: MailerService,
  ) {}

  async getFileUploadPath(fileUpload: any): Promise<string> {
    const imageFile: any = await fileUpload;
    const fileName = `${imageFile?.filename}`;
    const filePath = await uploadFileStream(
      imageFile.createReadStream,
      this.uploadDir,
      fileName,
    );
    return filePath;
  }

  async create(input: CreateYearlyViewInput, userId: number) {
    try {
      const photoUrl = input?.photoUrl
        ? await this.getFileUploadPath(input.photoUrl)
        : null;

      const attachment1Url = input?.attachment1Url
        ? await this.getFileUploadPath(input.attachment1Url)
        : null;
      const attachment2Url = input?.attachment2Url
        ? await this.getFileUploadPath(input?.attachment2Url)
        : null;

      const attachments: YearlyViewAttachment[] = input?.yearlyViewAttachment
        ? await Promise.all(
            input.yearlyViewAttachment.map(
              async (att: CreateYearlyViewAttachmentInput) => {
                let url: string | null = null;
                if (att?.attachmentUrl) {
                  const f: any = await att.attachmentUrl;
                  const fn = `${f.filename}`;
                  url = await uploadFileStream(
                    f.createReadStream,
                    this.uploadDir,
                    fn,
                  );
                }
                return {
                  attachmentUrl: url,
                  attachmentName: att?.attachmentName ?? null,
                  createdBy: userId,
                } as any;
              },
            ),
          )
        : [];

      const createdData = await this.prisma.yearlyViewComponent.create({
        data: {
          ...input,
          photoUrl,
          attachment1Url,
          attachment2Url,
          yearlyViewAttachment: { create: attachments },
          createdBy: userId,
          updatedBy: userId,
        },
      });

      const component = await this.prisma.component.findMany({
        where: {
          label: componentList.YearlyView,
        },
      });

      if (component) {
        const emailAttachments = [];
        if (attachment1Url) {
          emailAttachments.push({
            filename: attachment1Url.split('/').pop() || 'Attachment 01',
            path: attachment1Url,
          });
        }
        if (attachment2Url) {
          emailAttachments.push({
            filename: attachment2Url.split('/').pop() || 'Attachment 02',
            path: attachment2Url,
          });
        }
        if (photoUrl) {
          emailAttachments.push({
            filename: photoUrl.split('/').pop() || 'Photo',
            path: photoUrl,
          });
        }
        if (attachments?.length) {
          for (const att of attachments) {
            if (att?.attachmentUrl) {
              emailAttachments.push({
                filename:
                  att.attachmentUrl.split('/').pop() ||
                  'Rest of the attachments',
                path: att.attachmentUrl,
              });
            }
          }
        }

        const emailContent: EwuEmail[] =
          await this.prismaMasterData.ewuEmail.findMany({
            where: {
              componentId: component[0].id,
              pageId: input.pageId,
            },
          });
        if (emailContent) {
          sendMail(
            emailContent[0]?.email,
            emailContent[0]?.emailSubject,
            `${emailContent[0]?.emailBody}`,
            this.mailService,
            [],
            emailAttachments,
          );
        } else {
          throw new HttpException(
            'Email content not found for Yearly View component',
            HttpStatus.NOT_FOUND,
          );
        }
      }

      return createdData;
    } catch (error) {
      throw new HttpException(
        `Error in yearly view component: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    return this.prisma.yearlyViewComponent.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: { yearlyViewAttachment: true },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.yearlyViewComponent.findUnique({
      where: { id },
      include: { yearlyViewAttachment: true },
    });
    if (!result)
      throw new NotFoundException(
        `YearlyViewComponent with ID ${id} not found`,
      );
    return result;
  }

  async update(input: UpdateYearlyViewInput, userId: number) {
    try {
      const existing = await this.prisma.yearlyViewComponent.findUnique({
        where: { id: input.id },
        include: { yearlyViewAttachment: true },
      });
      if (!existing)
        throw new NotFoundException(
          `YearlyViewComponent with ID ${input.id} not found`,
        );

      const updateInputData = {
        ...input,
        photoUrl: existing?.photoUrl,
        attachment1Url: existing?.attachment1Url,
        attachment2Url: existing?.attachment2Url,
      };
      this.logger.log(`Update Input Data: ${JSON.stringify(updateInputData)}`);

      if (input?.photoUrl) {
        if (existing?.photoUrl) {
          deleteFileAndDirectory(
            existing?.photoUrl?.replace(`${process.env.BASE_URL}/`, ''),
          );
        }
        const newPhotoUrl = await this.getFileUploadPath(input.photoUrl);
        this.logger.log(`New Photo URL: ${newPhotoUrl}`);
        updateInputData.photoUrl = newPhotoUrl;
      }

      if (input?.attachment1Url) {
        if (existing?.attachment1Url) {
          deleteFileAndDirectory(
            existing?.attachment1Url?.replace(`${process.env.BASE_URL}/`, ''),
          );
        }
        const newAttachment1Url = await this.getFileUploadPath(
          input.attachment1Url,
        );
        this.logger.log(`New Attachment 1 URL: ${newAttachment1Url}`);
        updateInputData.attachment1Url = newAttachment1Url;
      }

      if (input?.attachment2Url) {
        if (existing?.attachment2Url) {
          deleteFileAndDirectory(
            existing?.attachment2Url?.replace(`${process.env.BASE_URL}/`, ''),
          );
        }
        const newAttachment2Url = await this.getFileUploadPath(
          input.attachment2Url,
        );
        this.logger.log(`New Attachment 2 URL: ${newAttachment2Url}`);
        updateInputData.attachment2Url = newAttachment2Url;
      }

      // Replace attachments
      let attachments: any[] = [];
      if (existing?.yearlyViewAttachment?.length) {
        for (const a of existing.yearlyViewAttachment) {
          if (a.attachmentUrl) {
            const p = a.attachmentUrl.replace(`${process.env.BASE_URL}/`, '');
            deleteFileAndDirectory(p);
          }
        }
        await this.prisma.yearlyViewAttachment.deleteMany({
          where: { yearlyViewId: input?.id },
        });
      }
      if (input?.yearlyViewAttachment) {
        attachments = await Promise.all(
          input?.yearlyViewAttachment.map(async (att) => {
            let url = null;
            if (att.attachmentUrl) {
              const f: any = await att.attachmentUrl;
              const fn = `${f.filename}`;
              url = await uploadFileStream(
                f.createReadStream,
                this.uploadDir,
                fn,
              );
            }
            return {
              attachmentUrl: url,
              attachmentName: att.attachmentName ?? null,
              updatedBy: userId,
            } as any;
          }),
        );
      }

      const updatedData = await this.prisma.yearlyViewComponent.update({
        where: { id: input.id },
        data: {
          ...updateInputData,
          yearlyViewAttachment: {
            deleteMany: {},
            create: attachments?.map((url) => ({
              attachmentUrl: url.attachmentUrl,
              attachmentName: url.attachmentName,
              updatedBy: userId,
            })),
          },
          updatedBy: userId,
        },
      });

      const component = await this.prisma.component.findMany({
        where: {
          label: componentList.YearlyView,
        },
      });

      if (component) {
        const emailAttachments = [];
        if (updateInputData?.attachment1Url) {
          emailAttachments.push({
            filename:
              updateInputData.attachment1Url.split('/').pop() ||
              'Attachment 01',
            path: updateInputData.attachment1Url,
          });
        }
        if (updateInputData?.attachment2Url) {
          emailAttachments.push({
            filename:
              updateInputData.attachment2Url.split('/').pop() ||
              'Attachment 02',
            path: updateInputData.attachment2Url,
          });
        }
        if (updateInputData?.photoUrl) {
          emailAttachments.push({
            filename: updateInputData.photoUrl.split('/').pop() || 'photo',
            path: updateInputData.photoUrl,
          });
        }
        if (attachments?.length) {
          for (const att of attachments) {
            if (att?.attachmentUrl) {
              emailAttachments.push({
                filename:
                  att.attachmentUrl.split('/').pop() ||
                  'Rest of the attachments',
                path: att.attachmentUrl,
              });
            }
          }
        }

        const emailContent: EwuEmail[] =
          await this.prismaMasterData.ewuEmail.findMany({
            where: {
              componentId: component[0].id,
              pageId: input.pageId,
            },
          });
        if (emailContent) {
          sendMail(
            emailContent[0]?.email,
            emailContent[0]?.emailSubject,
            `${emailContent[0]?.emailBody}`,
            this.mailService,
            [],
            emailAttachments,
          );
        } else {
          throw new HttpException(
            'Email content not found for Yearly View component',
            HttpStatus.NOT_FOUND,
          );
        }
      }
      return updatedData;
    } catch (error) {
      throw new HttpException(
        `Error updating yearly view component: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    if (item.photoUrl)
      deleteFileAndDirectory(
        item.photoUrl.replace(`${process.env.BASE_URL}/`, ''),
      );
    if (item.attachment1Url)
      deleteFileAndDirectory(
        item.attachment1Url.replace(`${process.env.BASE_URL}/`, ''),
      );
    if (item.attachment2Url)
      deleteFileAndDirectory(
        item.attachment2Url.replace(`${process.env.BASE_URL}/`, ''),
      );
    return this.prisma.yearlyViewComponent.delete({ where: { id } });
  }
}
