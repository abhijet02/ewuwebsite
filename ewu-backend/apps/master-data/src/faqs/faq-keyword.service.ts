import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { CreateFaqKeywordInput } from './dto/create-faq-keyword.input';
import { UpdateFaqKeywordInput } from './dto/update-faq-keyword.input';

@Injectable()
export class FaqKeywordService {
  private logger = new Logger('faq Keyword service');

  constructor(
    @Inject(PrismaMasterDataService)
    private prismaService: PrismaMasterDataService,
  ) {}

  async create(createFaqKeywordInput: CreateFaqKeywordInput, userId: number) {
    try {
      const { label } = createFaqKeywordInput;
      const isFaqKeywordExist = await this.prismaService.faqKeyword.findMany({
        where: {
          label,
        },
      });
      this.logger.log(`isFaqKeywordExist ${isFaqKeywordExist.length}`);
      if (isFaqKeywordExist.length) {
        this.logger.log('Faq keyword create: faq keyword has alreday exist');
        throw new HttpException('Faq already exist', HttpStatus.BAD_REQUEST);
      }
      const response = await this.prismaService.faqKeyword.create({
        data: {
          ...createFaqKeywordInput,
          createdBy: userId,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(
        `Error creating faq keyword: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(page: number = 1, limit = 20) {
    const skip = (page - 1) * limit;
    try {
      const faqKeywords = await this.prismaService.faqKeyword.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return faqKeywords;
    } catch (error) {
      throw new HttpException(
        `Error fetching faq keyowrd: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    //return await this.prismaService.faq.findMany({ take: limit });
  }

  async findOne(id: number) {
    return await this.prismaService.faqKeyword.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateFaqKeywordInput: UpdateFaqKeywordInput,
    userId: number,
  ) {
    const isFaqKeywordExist = await this.prismaService.faqKeyword.findUnique({
      where: {
        id,
      },
    });
    if (isFaqKeywordExist) {
      const updatedFaqKeyword = await this.prismaService.faqKeyword.update({
        data: {
          ...updateFaqKeywordInput,
          updatedBy: userId,
        },
        where: {
          id,
        },
      });
      return updatedFaqKeyword;
    } else {
      throw new HttpException('Faq keyword not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isFaqKeywordExist = await this.prismaService.faqKeyword.findUnique({
        where: {
          id,
        },
      });
      if (isFaqKeywordExist) {
        await this.prismaService.faqKeyword.delete({
          where: {
            id,
          },
        });
        return isFaqKeywordExist;
      } else {
        throw new HttpException(
          'Faq keyword not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(
        `Error Deleting Faq keyword: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
