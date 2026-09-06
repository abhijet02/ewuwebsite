import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';

@Injectable()
export class FaqsService {
  private logger = new Logger('faq  service');

  constructor(
    @Inject(PrismaMasterDataService)
    private prismaService: PrismaMasterDataService,
  ) {}

  async create(createFaqInput: CreateFaqInput, userId: number) {
    try {
      const { title } = createFaqInput;
      const isFaqExist = await this.prismaService.faq.findMany({
        where: {
          title,
        },
      });
      this.logger.log(`isFaqExist ${isFaqExist.length}`);
      if (isFaqExist.length) {
        this.logger.log('Faq create: faq has alreday exist');
        throw new HttpException('Faq already exist', HttpStatus.BAD_REQUEST);
      }
      const response = await this.prismaService.faq.create({
        data: {
          ...createFaqInput,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(
        `Error creating faq: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(page: number = 1, limit = 20) {
    const skip = (page - 1) * limit;
    try {
      const faqs = await this.prismaService.faq.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return faqs;
    } catch (error) {
      throw new HttpException(
        `Error fetching faq: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    //return await this.prismaService.faq.findMany({ take: limit });
  }

  async findOne(id: number) {
    return await this.prismaService.faq.findUnique({
      where: {
        id,
      },
    });
  }

  async findByKeword(keyWordid: number) {
    return await this.prismaService.faq.findMany({
      where: {
        keywordId: keyWordid,
      },
    });
  }

  async filterByQuestion(search: string) {
    try {
      const faqs = await this.prismaService.faq.findMany({
        where: {
          title: {
            startsWith: search,
          },
        },
      });

      return faqs;
    } catch (error) {
      throw new HttpException(
        `Error fetching faq: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateFaqInput: UpdateFaqInput, userId: number) {
    const isFaqExist = await this.prismaService.faq.findUnique({
      where: {
        id,
      },
    });
    if (isFaqExist) {
      const updatedFaq = await this.prismaService.faq.update({
        data: {
          ...updateFaqInput,
          updatedBy: userId,
        },
        where: {
          id,
        },
      });
      return updatedFaq;
    } else {
      throw new HttpException('Faculty not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isFaqExist = await this.prismaService.faq.findUnique({
        where: {
          id,
        },
      });
      if (isFaqExist) {
        await this.prismaService.faq.delete({
          where: {
            id,
          },
        });
        return isFaqExist;
      } else {
        throw new HttpException('Faculty not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(
        `Error Deleting faculty: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
