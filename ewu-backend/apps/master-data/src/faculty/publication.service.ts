import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreatePublicationInput,
  UpdatePublicationInput,
} from './dto/publication.input';

@Injectable()
export class PublicationService {
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(data: CreatePublicationInput, userId: number) {
    try {
      return await this.prisma.publication.create({
        data: {
          ...data,
          createdBy: userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create publication',
        error.message,
      );
    }
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    try {
      return await this.prisma.publication.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch publications',
        error.message,
      );
    }
  }

  async findAllWithPagination(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    try {
      const [data, total] = await this.prisma.$transaction([
        this.prisma.publication.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.publication.count(),
      ]);

      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch paginated publications',
        error.message,
      );
    }
  }

  async findOne(id: number) {
    try {
      const publication = await this.prisma.publication.findUnique({
        where: { id },
      });
      if (!publication) {
        throw new NotFoundException(`Publication with ID ${id} not found`);
      }
      return publication;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch publication',
        error.message,
      );
    }
  }

  async findByFacultyId(facultyPersonId: number) {
    try {
      return await this.prisma.publication.findMany({
        where: { facultyPersonId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch publications by faculty',
        error.message,
      );
    }
  }

  async update(id: number, data: UpdatePublicationInput, userId: number) {
    try {
      return await this.prisma.publication.update({
        where: { id },
        data: {
          ...data,
          updatedBy: userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update publication',
        error.message,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.publication.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete publication',
        error.message,
      );
    }
  }
}
