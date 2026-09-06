import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClubResolver } from './club.resolver';
import { ClubService } from './club.service';
import { ClubActivityRankingResolver } from './club-activity-ranking.resolver';
import { ClubActivityRankingService } from './club-activity-ranking.service';
import { ClubMemberResolver } from './club-member.resolver';
import { ClubMemberService } from './club-member.service';
import { SkillResolver } from './skill.resolver';
import { SkillService } from './skill.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  providers: [
    ClubResolver,
    ClubService,
    ClubActivityRankingResolver,
    ClubActivityRankingService,
    ClubMemberResolver,
    ClubMemberService,
    SkillResolver,
    SkillService,
    JwtService,
    ConfigService,
  ],
})
export class ClubModule {}
