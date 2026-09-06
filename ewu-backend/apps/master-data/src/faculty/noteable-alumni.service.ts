import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateNoteableAlumniInput,
  UpdateNoteableAlumniInput,
} from './dto/noteable-alumni.input';

import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { NoteableAlumni } from './entities/noteable-alumni.entity';

@Injectable()
export class NoteableAlumniService {
  private uploadDir = join(process.env.UPLOAD_DIR, `noteable-alumni`, 'files');
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(
    createNoteableAlumniInput: CreateNoteableAlumniInput,
    userId: number,
  ) {
    let photoPath = null;
    if (createNoteableAlumniInput?.photoUrl) {
      const imageFile: any = await createNoteableAlumniInput.photoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      photoPath = await filePath;
    }

    return await this.prisma.noteableAlumni.create({
      data: {
        ...createNoteableAlumniInput,
        photoUrl: photoPath,
        createdBy: userId,
      },
    });
  }

  async findAll(page = 1, limit: number) {
    const skip = (page - 1) * limit;
    return await this.prisma.noteableAlumni.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const alumni = await this.prisma.noteableAlumni.findUnique({
      where: { id },
    });
    if (!alumni) {
      throw new NotFoundException(`NoteableAlumni with ID ${id} not found`);
    }
    return alumni;
  }

  async update(
    id: number,
    updateNoteableAlumniInput: UpdateNoteableAlumniInput,
    userId: number,
  ) {
    const existingAlumni = await this.prisma.noteableAlumni.findUnique({
      where: { id },
    });

    if (!existingAlumni) {
      throw new NotFoundException(`Error Updating Alumni: Id ${id} not found`);
    }

    let alumniInput = {
      ...updateNoteableAlumniInput,
      photoUrl: existingAlumni.photoUrl,
    };

    if (updateNoteableAlumniInput?.photoUrl) {
      // Delete old file if exists
      if (existingAlumni?.photoUrl) {
        const prevPhotoPath = existingAlumni.photoUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPhotoPath);
      }
      const imageFile: any = await updateNoteableAlumniInput.photoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      const photoUrl = await filePath;

      alumniInput = {
        ...updateNoteableAlumniInput,
        photoUrl,
      };
    }

    return await this.prisma.noteableAlumni.update({
      where: { id },
      data: {
        ...alumniInput,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number) {
    try {
      const alumni: NoteableAlumni = await this.findOne(id);
      if (alumni) {
        await this.prisma.noteableAlumni.delete({ where: { id } });
        if (alumni?.photoUrl) {
          const prevPhotoPath = alumni.photoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }
        return alumni;
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Alumni: ${e}`, 500);
    }
  }
}
