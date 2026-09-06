import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreateCourseInput, UpdateCourseInput } from './dto/course.input';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaMasterDataService) {}

  /**
   * Create a new course
   */
  async create(createCourseInput: CreateCourseInput, userId: string) {
    try {
      return await this.prisma.course.create({
        data: { ...createCourseInput, createdBy: parseInt(userId) },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'Error creating course');
    }
  }

  /**
   * Get all courses with optional pagination
   */
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    try {
      const [courses, total] = await this.prisma.$transaction([
        this.prisma.course.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.course.count(),
      ]);

      return courses;
      // data: courses,
      // total,
      // page,
      // totalPages: Math.ceil(total / limit),
      //};
    } catch (error) {
      this.handleDatabaseError(error, 'Error fetching courses');
    }
  }

  /**
   * Find a single course by ID
   */
  async findOne(id: number) {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id },
      });
      if (!course)
        throw new NotFoundException(`Course with ID ${id} not found`);
      return course;
    } catch (error) {
      this.handleDatabaseError(error, `Error finding course with ID ${id}`);
    }
  }

  /**
   * Update a course by ID
   */
  async update(id: number, updateCourseInput: UpdateCourseInput, userId: any) {
    try {
      await this.findOne(id); // Ensure the course exists before updating

      return await this.prisma.course.update({
        where: { id },
        data: {
          ...updateCourseInput,
          updatedBy: parseInt(userId),
        },
      });
    } catch (error) {
      this.handleDatabaseError(error, `Error updating course with ID ${id}`);
    }
  }

  /**
   * Delete a course by ID
   */
  async remove(id: number) {
    try {
      let deleteItem = await this.findOne(id); // Ensure the course exists before deleting
      await this.prisma.course.delete({
        where: { id },
      });

      return deleteItem;
    } catch (error) {
      this.handleDatabaseError(error, `Error deleting course with ID ${id}`);
    }
  }

  /**
   * Handle database errors
   */
  private handleDatabaseError(error: any, message: string) {
    throw new InternalServerErrorException(message);
  }
}
