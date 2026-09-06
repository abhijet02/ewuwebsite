import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateEwuEmailInput,
  UpdateEwuEmailInput,
} from './dto/ewu-email.input';
import { EwuEmail } from './entities/ewu-email.entity';

@Injectable()
export class EwuEmailService {
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(
    createEwuEmailInput: CreateEwuEmailInput,
    userId: number,
  ): Promise<EwuEmail> {
    return await this.prisma.ewuEmail.create({
      data: {
        ...createEwuEmailInput,
        createdBy: userId,
      },
    });
  }

  async findAll(page = 1, limit): Promise<EwuEmail[]> {
    return await this.prisma.ewuEmail.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<EwuEmail> {
    const result = await this.prisma.ewuEmail.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException(`EwuEmail with ID ${id} not found`);
    }
    return result;
  }

  async update(
    id: number,
    updateEwuEmailInput: UpdateEwuEmailInput,
    userId: number,
  ): Promise<EwuEmail> {
    const existing = await this.prisma.ewuEmail.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`EwuEmail with ID ${id} not found`);
    }

    return await this.prisma.ewuEmail.update({
      where: { id },
      data: {
        ...updateEwuEmailInput,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number): Promise<EwuEmail> {
    const existing = await this.findOne(id);
    try {
      await this.prisma.ewuEmail.delete({ where: { id } });
      return existing;
    } catch (e) {
      throw new HttpException(`Error deleting EwuEmail: ${e.message}`, 500);
    }
  }
}
