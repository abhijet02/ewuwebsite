import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsResolver } from './faqs.resolver';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FaqKeywordService } from './faq-keyword.service';
import { FaqKeywordResolver } from './faq-keyword.resolver';

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
    FaqsResolver,
    FaqsService,
    FaqKeywordResolver,
    FaqKeywordService,
    JwtService,
    ConfigService,
  ],
})
export class FaqsModule {}
