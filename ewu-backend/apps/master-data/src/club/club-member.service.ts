import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateClubMemberInput,
  UpdateClubMemberInput,
} from './dto/club-member.input';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { sendMail } from 'apps/user-service/src/utils/email.util';

@Injectable()
export class ClubMemberService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'club-member', 'photos');

  constructor(
    private readonly prisma: PrismaMasterDataService,
    private readonly mailService: MailerService,
  ) {}

  async create(input: CreateClubMemberInput) {
    try {
      let photoPath = null;
      let cvUrl = null;
      let signatureUrl = null;
      const isSlugExist = await this.findBySlug(input?.slug);
      if (isSlugExist)
        throw new HttpException('Slug already exist', HttpStatus.BAD_REQUEST);

      if (input?.photoUrl) {
        const imageFile: any = await input.photoUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        photoPath = await filePath;
      }

      if (input?.cvUrl) {
        const imageFile: any = await input.cvUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        cvUrl = await filePath;
      }

      if (input?.signatureUrl) {
        const imageFile: any = await input.signatureUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        signatureUrl = await filePath;
      }

      const createdMember = await this.prisma.clubMember.create({
        data: {
          ...input,
          photoUrl: photoPath,
          signatureUrl,
          cvUrl,
          createdBy: 0,
        },
      });

      const emaildata = await this.prisma.ewuEmail.findMany({
        where: { clubId: input.clubId },
      });

      if (emaildata && emaildata.length) {
        const subject = emaildata[0].emailSubject;
        const body = emaildata[0].emailBody;
        const ccEmail = emaildata[0].email;
        sendMail(
          [createdMember.email],
          subject,
          body,
          this.mailService,
          ccEmail,
        );
      }

      return createdMember;
    } catch (e) {
      throw new HttpException(`Error Creating Club Member: ${e}`, 500);
    }
  }

  async findAll(page = 1, limit: number) {
    const skip = (page - 1) * limit;

    return await this.prisma.clubMember.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const member = await this.prisma.clubMember.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(`ClubMember with ID ${id} not found`);
    }

    return member;
  }

  async findBySlug(slug: string) {
    const member = await this.prisma.clubMember.findUnique({
      where: { slug },
    });

    return member;
  }

  async update(id: number, input: UpdateClubMemberInput, userId: number) {
    const existing = await this.prisma.clubMember.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`ClubMember with ID ${id} not found`);
    }

    const updatedInput = {
      ...input,
      photoUrl: existing?.photoUrl,
      cvUrl: existing?.cvUrl,
      signatureUrl: existing?.signatureUrl,
    };

    if (input?.photoUrl) {
      if (existing?.photoUrl) {
        const prevPhotoPath = existing.photoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      const imageFile: any = await input.photoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );

      updatedInput.photoUrl = await filePath;
    }

    if (input?.cvUrl) {
      if (existing?.cvUrl) {
        const prevPhotoPath = existing.cvUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      const imageFile: any = await input.cvUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );

      updatedInput.cvUrl = await filePath;
    }

    if (input?.signatureUrl) {
      if (existing?.signatureUrl) {
        const prevPhotoPath = existing.signatureUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      const imageFile: any = await input.signatureUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );

      updatedInput.signatureUrl = await filePath;
    }

    return await this.prisma.clubMember.update({
      where: { id },
      data: {
        ...updatedInput,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number) {
    try {
      const existing = await this.findOne(id);

      await this.prisma.clubMember.delete({ where: { id } });

      if (existing?.photoUrl) {
        const prevPhotoPath = existing.photoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }
      if (existing?.cvUrl) {
        const prevPhotoPath = existing.cvUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }
      if (existing?.signatureUrl) {
        const prevPhotoPath = existing.signatureUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      return existing;
    } catch (error) {
      throw new HttpException(`Error Deleting Club Member: ${error}`, 500);
    }
  }
}
