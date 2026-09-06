import { HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';
import { Section } from './entities/section.entity';
import { PrismaPageBuilderService } from '../../../../prisma/prisma-page-builder.service';

@Injectable()
export class SectionService {
  private logger = new Logger('Builder  service');
  
  
    constructor(
      @Inject(PrismaPageBuilderService)
      private prismaService: PrismaPageBuilderService,
    ) {}
    
    async create(
      createSectionInput: CreateSectionInput,
    ): Promise<Section> {
      try {
  
        const createdSectiondata = this.prismaService.section.create({
          data: {
            ...createSectionInput
          },
        });
  
        this.logger.log(`Section date: ${createdSectiondata}`);
        return createdSectiondata;
      } catch (e) {
        throw new HttpException(`Error Creating section: ${e}`, 500);
      }
    }
  
    async findAll(page, limit, pageId?: number): Promise<Section[]> {
       const whereCondition = pageId ? {pageId: pageId}: {};
      return this.prismaService.section.findMany({
           where: whereCondition
      });
    }
  
    async findOne(id: number): Promise<Section> {
      const slider = await this.prismaService.section.findUnique({
        where: { id },
      });
      if (!slider) throw new NotFoundException(`section with ID ${id} not found`);
      return slider;
    }
  
    async update(
      id: number,
      updateSectionInput: UpdateSectionInput,
    ): Promise<Section> {
      try {
        const isSectionExist: Section = await this.findOne(id); 
        if (isSectionExist) {
  
          const updatedSectionData = await this.prismaService.section.update({
            data: {
              ...updateSectionInput,
            },
            where: {
              id,
            },
          });
          return updatedSectionData;
        } else {
          throw new HttpException('section not exist', HttpStatus.BAD_REQUEST);
        }
      } catch (e) {
        throw new HttpException(`Error Updating section: ${e}`, 500);
      }
    }
  
    async remove(id: number): Promise<Section> {
      try {
        const isSectionExist: Section = await this.findOne(id); // Ensure the notice exists
        if (isSectionExist) {
           await this.prismaService.section.delete({ where: { id } });
          }
          return isSectionExist;
        
      } catch (e) {
        throw new HttpException(`Error Updating section: ${e}`, 500);
      }
    }
}
