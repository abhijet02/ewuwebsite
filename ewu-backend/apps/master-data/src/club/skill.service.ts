import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.input';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaMasterDataService) {}

  async create(input: CreateSkillInput, userId: number) {
    return await this.prisma.skill.create({
      data: {
        ...input,
        createdBy: userId,
      },
    });
  }

  async findAll(page = 1, limit) {
    return await this.prisma.skill.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: number, input: UpdateSkillInput, userId: number) {
    const existing = await this.prisma.skill.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return await this.prisma.skill.update({
      where: { id },
      data: {
        ...input,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number) {
    try {
      const skill = await this.findOne(id);
      await this.prisma.skill.delete({ where: { id } });
      return skill;
    } catch (error) {
      throw new HttpException(`Error Deleting Skill: ${error}`, 500);
    }
  }
}
