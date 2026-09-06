import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateLatestNewsInput } from '../dto/create-latest-news.input';
import { UpdateLatestNewsInput } from '../dto/update-latest-news.input';
import { YesOrNo } from '../../prisma/yes-or-no-type.enum';

@Injectable()
export class LatestNewsService {
  private logger = new Logger('Latest News  service');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async create(createLatestNewsInput: CreateLatestNewsInput) {
    try {
      const response = await this.prismaService.latestNews.create({
        data: {
          ...createLatestNewsInput,
        },
      });
      return response;
    } catch (e) {
      throw new HttpException(`Error creating Latest News: ${e}`, 500);
    }
  }

  async findAll(page: number = 1, limit = 20) {
    const skip = (page - 1) * limit;

    // Fetch all marquee data in parallel
    const [newsMarquee, noticeMarquee, eventMarquee, achievementMarquee] =
      await Promise.all([
        this.prismaService.news.findMany({
          where: {
            isMarquee: YesOrNo.YES,
          },
        }),
        this.prismaService.notice.findMany({
          where: {
            isMarquee: YesOrNo.YES,
          },
        }),
        this.prismaService.event.findMany({
          where: {
            isMarquee: YesOrNo.YES,
          },
        }),
        this.prismaService.achievement.findMany({
          where: {
            isMarquee: YesOrNo.YES,
          },
        }),
      ]);

    // Create all marquee items in latest news (check by label/title only)
    await this.createAllMarqueeInLatestNews(newsMarquee, 'news');
    await this.createAllMarqueeInLatestNews(noticeMarquee, 'notice');
    await this.createAllMarqueeInLatestNews(eventMarquee, 'event');
    await this.createAllMarqueeInLatestNews(achievementMarquee, 'achievement');

    // Return latest news
    return await this.prismaService.latestNews.findMany({
      orderBy: { entryDate: 'desc' },
      skip,
      take: limit,
    });
  }

  private async createAllMarqueeInLatestNews(
    marqueeItems: any[],
    type: string,
  ) {
    for (const item of marqueeItems) {
      try {
        const title = type === 'event' ? item.title : item.label;

        // Check if already exists in latest news by title/label only
        const existingLatestNews =
          await this.prismaService.latestNews.findFirst({
            where: {
              label: title,
            },
          });

        // Only create if it doesn't exist (by title)
        if (!existingLatestNews) {
          await this.prismaService.latestNews.create({
            data: {
              label: title,
              pageId: item.pageId,
              link: '#',
              entryDate:
                item.date || item.fromDate || item.createdAt || new Date(),
              isPublished: YesOrNo.YES,
            },
          });
          console.log(`Created latest news from ${type} marquee: ${title}`);
        }
      } catch (error) {
        console.error(`Error creating latest news from ${type}:`, error);
        // Continue with other items even if one fails
      }
    }
  }

  async findOne(id: number) {
    return await this.prismaService.latestNews.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMenuInput: UpdateLatestNewsInput) {
    const isLatestNewsExist = await this.prismaService.latestNews.findUnique({
      where: {
        id,
      },
    });
    if (isLatestNewsExist) {
      const updatedMenuItem = await this.prismaService.latestNews.update({
        data: {
          ...updateMenuInput,
        },
        where: {
          id,
        },
      });
      return updatedMenuItem;
    } else {
      throw new HttpException('Latest News not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isLatestNewsExist = await this.prismaService.latestNews.findUnique({
        where: {
          id,
        },
      });
      if (isLatestNewsExist) {
        await this.prismaService.latestNews.delete({
          where: {
            id,
          },
        });
        return isLatestNewsExist;
      } else {
        throw new HttpException(
          'Latest News  not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Latest News: ${e}`, 500);
    }
  }
}
