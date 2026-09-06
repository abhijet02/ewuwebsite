import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from './dto/department.input'; // Import your DTOs if any
import { Department } from './entities/department.entity';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'apps/user-service/src/utils/file-upload.util';
import * as path from 'path';
@Injectable()
export class DepartmentService {
  private uploadDir = path.join(process.env.UPLOAD_DIR, `department`, 'files');

  constructor(private prisma: PrismaMasterDataService) {}

  // Get a department by id
  async getDepartment(id: number): Promise<Department> {
    return this.prisma.department.findUnique({
      where: { id },
    });
  }

  // Get all departments
  async getDepartments(page = 1, limit = 20): Promise<Department[]> {
    const skip = (page - 1) * limit; // Calculate how many records to skip

    return this.prisma.department.findMany({
      skip,
      take: limit, // Number of records to return
    });
  }

  // Fetch departments by faculty ID
  async getDepartmentsByFaculty(facultyId: number): Promise<Department[]> {
    return this.prisma.department.findMany({ where: { facultyId } });
  }

  // Create a new department
  async createDepartment(input: CreateDepartmentInput, userId: number) {
    try {
      const imageFile: any = await input.photoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );

      const photoUrl = await filePath;
      return this.prisma.department.create({
        data: {
          ...input,
          photoUrl,
          createdBy: userId,
        },
      });
    } catch (e) {
      throw new HttpException(
        `Error Creating Department: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Update an existing department
  async updateDepartment(
    id: number,
    input: UpdateDepartmentInput,
    userId: number,
  ) {
    try {
      const isDepartmentExist = await this.getDepartment(id);
      if (isDepartmentExist) {
        let departmentInputData = {
          ...input,
          photoUrl: isDepartmentExist.photoUrl,
        };
        if (isDepartmentExist?.photoUrl) {
          if (isDepartmentExist?.photoUrl) {
            const prevfilePath = isDepartmentExist?.photoUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevfilePath);
          }
          const imageFile: any = await input.photoUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );

          const photoUrl = await filePath;
          departmentInputData = {
            ...departmentInputData,
            photoUrl,
          };
        }
        const updatedDepartment = this.prisma.department.update({
          where: { id },
          data: {
            ...departmentInputData,
            updatedBy: userId,
          },
        });
        return updatedDepartment;
      } else {
        throw new NotFoundException(`Department ID ${id} not found`);
      }
    } catch (e) {
      throw new HttpException(
        `Error Updating Department: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Delete a department
  async deleteDepartment(id: number) {
    try {
      const isDepartmentExist = await this.getDepartment(id);
      if (isDepartmentExist) {
        if (isDepartmentExist?.photoUrl) {
          const prevfilePath = isDepartmentExist?.photoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        const removedDepartment = await this.prisma.department.delete({
          where: { id },
        });

        return removedDepartment;
      } else {
        throw new NotFoundException(`Department ID ${id} not found`);
      }
    } catch (e) {
      throw new HttpException(
        `Error Deleting Department: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
