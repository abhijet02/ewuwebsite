import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { ClubActivityRanking } from './entities/club-activity-ranking.input';
import {
  CreateClubActivityRankingInput,
  UpdateClubActivityRankingInput,
} from './dto/club-activity-ranking.input';

@Injectable()
export class ClubActivityRankingService {
  private logger = new Logger('Club Activity Ranking  service');
  //

  constructor(
    @Inject(PrismaMasterDataService)
    private prismaService: PrismaMasterDataService,
  ) {}

  async create(
    createClubActivityRankingInput: CreateClubActivityRankingInput,
    userId: number,
  ): Promise<ClubActivityRanking> {
    try {
      const createdClubActivitydata =
        this.prismaService.clubActivityRanking.create({
          data: {
            ...createClubActivityRankingInput,
            createdBy: userId,
          },
        });

      this.logger.log(`Club Activity ranking Data: ${createdClubActivitydata}`);
      return createdClubActivitydata;
    } catch (e) {
      throw new HttpException(
        `Error Creating Club Activity ranking: ${e}`,
        500,
      );
    }
  }

  async findAll(page, limit): Promise<ClubActivityRanking[]> {
    return this.prismaService.clubActivityRanking.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<ClubActivityRanking> {
    const clubActivityRanking =
      await this.prismaService.clubActivityRanking.findUnique({
        where: { id },
      });

    if (!clubActivityRanking)
      throw new NotFoundException(
        `ClubActivityRanking with ID ${id} not found`,
      );

    return clubActivityRanking;
  }

  async update(
    id: number,
    updateClubActivityRankingInput: UpdateClubActivityRankingInput,
    userId: number,
  ): Promise<ClubActivityRanking> {
    try {
      const isClubActivityRankingExist: ClubActivityRanking =
        await this.findOne(id);
      if (isClubActivityRankingExist) {
        const updatedClubActivityRankingData =
          await this.prismaService.clubActivityRanking.update({
            data: {
              ...updateClubActivityRankingInput,
              updatedBy: userId,
            },
            where: {
              id,
            },
          });
        return updatedClubActivityRankingData;
      } else {
        throw new HttpException(
          'ClubActivityRanking not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Updating ClubActivityRanking: ${e}`, 500);
    }
  }

  async delete(id: number): Promise<ClubActivityRanking> {
    const isClubActivityRankingExist = await this.findOne(id); // Ensure the notice exists
    if (isClubActivityRankingExist) {
      await this.prismaService.clubActivityRanking.delete({ where: { id } });
      return isClubActivityRankingExist;
    } else {
      throw new HttpException(
        'ClubActivityRanking not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
