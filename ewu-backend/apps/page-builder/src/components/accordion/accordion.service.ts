import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import {
  CreateAccordionInput,
  UpdateAccordionInput,
} from '../dto/accordion.input';

@Injectable()
export class AccordionService {
  constructor(private readonly prisma: PrismaPageBuilderService) {}

  async create(createAccordionInput: CreateAccordionInput) {
    return this.prisma.accordion.create({
      data: createAccordionInput,
    });
  }

  async findAll() {
    return this.prisma.accordion.findMany();
  }

  async findOne(id: number) {
    const accordion = await this.prisma.accordion.findUnique({ where: { id } });
    if (!accordion) {
      throw new NotFoundException(`Accordion with ID ${id} not found`);
    }
    return accordion;
  }

  async update(id: number, updateAccordionInput: UpdateAccordionInput) {
    await this.findOne(id);
    return this.prisma.accordion.update({
      where: { id },
      data: updateAccordionInput,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.accordion.delete({
      where: { id },
    });
  }
}
