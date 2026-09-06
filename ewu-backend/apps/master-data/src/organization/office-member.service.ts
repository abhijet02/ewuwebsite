import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateOfficeMemberInput,
  UpdateOfficeMemberInput,
} from './dto/office-member.input';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';

@Injectable()
export class OfficeMemberService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'office-member', 'photos');

  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateOfficeMemberInput, userId: number) {
    try {
      let photoPath = null;
      let signatureUrl = null;
      let cvUrl = null;

      const isSlugExist = await this.findBySlug(input?.slug);
      if (isSlugExist)
        throw new HttpException('Slug already exist', HttpStatus.BAD_REQUEST);

      if (input?.profilePhotoUrl) {
        const imageFile: any = await input.profilePhotoUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        photoPath = await filePath;
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

      const createdOfficeMember = await this.prisma.officeMember.create({
        data: {
          ...input,
          profilePhotoUrl: photoPath,
          signatureUrl,
          cvUrl,
          createdBy: userId,
        },
      });
      return createdOfficeMember;
    } catch (e) {
      throw new HttpException(`Error Creating Office Member: ${e}`, 500);
    }
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.prisma.officeMember.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const member = await this.prisma.officeMember.findUnique({ where: { id } });

    if (!member) {
      throw new NotFoundException(`OfficeMember with ID ${id} not found`);
    }

    return member;
  }

  async findBySlug(slug: string) {
    const member = await this.prisma.officeMember.findUnique({
      where: { slug },
    });

    return member;
  }
  async update(id: number, input: UpdateOfficeMemberInput, userId: number) {
    const existing = await this.findOne(id);

    const updatedInput = {
      ...input,
      profilePhotoUrl: existing?.profilePhotoUrl,
      signatureUrl: existing?.signatureUrl,
      cvUrl: existing?.cvUrl,
    };

    if (input?.profilePhotoUrl) {
      if (existing?.profilePhotoUrl) {
        const prevPhotoPath = existing?.profilePhotoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      const imageFile: any = await input?.profilePhotoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      updatedInput.profilePhotoUrl = await filePath;
    }

    if (input?.signatureUrl) {
      if (existing?.signatureUrl) {
        const prevPhotoPath = existing?.signatureUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      const imageFile: any = await input?.signatureUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      updatedInput.signatureUrl = await filePath;
    }

    if (input?.cvUrl) {
      if (existing?.cvUrl) {
        const prevPhotoPath = existing?.cvUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }

      const imageFile: any = await input?.cvUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      updatedInput.cvUrl = await filePath;
    }

    const updatedOfficeMember = await this.prisma.officeMember.update({
      where: { id },
      data: {
        ...updatedInput,
        updatedBy: userId,
      },
    });
    return updatedOfficeMember;
  }

  async remove(id: number) {
    const existing = await this.findOne(id);
    await this.prisma.officeMember.delete({ where: { id } });

    if (existing?.profilePhotoUrl) {
      const prevPhotoPath = existing.profilePhotoUrl.replace(
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

    if (existing?.cvUrl) {
      const prevPhotoPath = existing?.cvUrl.replace(
        `${process.env.BASE_URL}/`,
        '',
      );
      deleteFileAndDirectory(prevPhotoPath);
    }

    return existing;
  }
}
