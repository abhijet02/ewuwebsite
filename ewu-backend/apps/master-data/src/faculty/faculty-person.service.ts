import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateFacultypersonInput,
  UpdateFacultypersonInput,
} from './dto/faculty-person.input';

import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { FacultyPerson } from './entities/faculty-person.entity';

@Injectable()
export class FacultypersonService {
  private uploadDir = join(process.env.UPLOAD_DIR, `faculty-person`, 'files');
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(
    createFacultypersonInput: CreateFacultypersonInput,
    userId: number,
  ) {
    let photoPath = null;
    let signatureUrl = null;
    let cvUrl = null;

    const isSlugExist = await this.findBySlug(createFacultypersonInput?.slug);
    if (isSlugExist)
      throw new HttpException('Slug already exist', HttpStatus.BAD_REQUEST);

    if (createFacultypersonInput?.photo) {
      const imageFile: any = await createFacultypersonInput.photo;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      photoPath = await filePath;
    }
    if (createFacultypersonInput?.signatureUrl) {
      const imageFile: any = await createFacultypersonInput.signatureUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      signatureUrl = await filePath;
    }
    if (createFacultypersonInput?.cvUrl) {
      const imageFile: any = await createFacultypersonInput.cvUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      cvUrl = await filePath;
    }

    return await this.prisma.facultyPerson.create({
      data: {
        ...createFacultypersonInput,
        photo: photoPath,
        signatureUrl,
        cvUrl,
        createdBy: userId,
      },
    });
  }

  async findAll(page = 1, limit) {
    const skip = (page - 1) * limit; // Calculate how many records to skip

    return await this.prisma.facultyPerson.findMany({
      skip,
      take: limit,
      include: {
        faculty: true,
        department: true,
        course: true,
      },
    });
  }

  async findOne(id: number) {
    const facultyPerson = await this.prisma.facultyPerson.findUnique({
      where: { id },
      include: {
        faculty: true,
        department: true,
        course: true,
      },
    });
    if (!facultyPerson) {
      throw new NotFoundException(`FacultyPerson with ID ${id} not found`);
    }
    return facultyPerson;
  }

  async findBySlug(slug: string) {
    const facultyPerson = await this.prisma.facultyPerson.findUnique({
      where: { slug },
      include: {
        faculty: true,
        department: true,
        course: true,
      },
    });
    return facultyPerson;
  }

  async update(
    id: number,
    updateFacultypersonInput: UpdateFacultypersonInput,
    userId: number,
  ) {
    const existingFacultyPerson = await this.prisma.facultyPerson.findUnique({
      where: { id },
    });
    if (existingFacultyPerson) {
      let facultyPersonInput = {
        ...updateFacultypersonInput,
        cvUrl: existingFacultyPerson.cvUrl,
        signatureUrl: existingFacultyPerson.signatureUrl,
        photo: existingFacultyPerson.photo,
      };
      if (updateFacultypersonInput?.photo) {
        // Delete old file if it exists
        if (existingFacultyPerson?.photo) {
          const prevPhotoPath = existingFacultyPerson.photo.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }
        const imageFile: any = await updateFacultypersonInput?.photo;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );

        const photoUrl = await filePath;

        facultyPersonInput = {
          ...facultyPersonInput,
          photo: photoUrl,
        };
      }

       if (updateFacultypersonInput?.signatureUrl) {
        // Delete old file if it exists
        if (existingFacultyPerson?.signatureUrl) {
          const prevPhotoPath = existingFacultyPerson.signatureUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }
        const imageFile: any = await updateFacultypersonInput?.signatureUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );

        const signatureUrl = await filePath;

        facultyPersonInput = {
          ...facultyPersonInput,
          signatureUrl: signatureUrl,
        };
      }

       if (updateFacultypersonInput?.cvUrl) {
        // Delete old file if it exists
        if (existingFacultyPerson?.cvUrl) {
          const prevPhotoPath = existingFacultyPerson.cvUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }
        const imageFile: any = await updateFacultypersonInput?.cvUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );

        const cvUrl = await filePath;

        facultyPersonInput = {
          ...facultyPersonInput,
          cvUrl: cvUrl,
        };
      }

      const updatedFacultyPerson = await this.prisma.facultyPerson.update({
        where: { id },
        data: {
          ...facultyPersonInput,
          updatedBy: userId,
        },
      });
      return updatedFacultyPerson;
    } else {
      throw new NotFoundException(
        `Error Updating Faculty Person: Id not found`,
      );
    }
  }

  async remove(id: number) {
    try {
      const isFacultyPersonExist: FacultyPerson = await this.findOne(id); // Ensure the notice exists
      if (isFacultyPersonExist) {
        await this.prisma.facultyPerson.delete({ where: { id } });
        if (isFacultyPersonExist?.photo) {
          const prevPhotoPath = isFacultyPersonExist.photo.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }

        if (isFacultyPersonExist?.cvUrl) {
          const prevPhotoPath = isFacultyPersonExist.cvUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }

         if (isFacultyPersonExist?.signatureUrl) {
          const prevPhotoPath = isFacultyPersonExist.signatureUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPhotoPath);
        }

        return isFacultyPersonExist;
      }
      
    } catch (e) {
      throw new HttpException(`Error Updating Faculty Person: ${e}`, 500);
    }
  }
}
