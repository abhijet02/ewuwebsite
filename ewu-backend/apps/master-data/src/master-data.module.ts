import { Module } from '@nestjs/common';
import { MasterDataController } from './master-data.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../../../prisma/prisma.module';
//import { ServeStaticModule } from '@nestjs/serve-static';
//import { join } from 'path';
import { OrganizationModule } from './organization/organization.module';
import { FacultyPersonModule } from './faculty/faculty-person.module';
import { FaqsModule } from './faqs/faqs.module';
import { ClubModule } from './club/club.module';
import { EmailConfigurationModule } from './email-configuration/email-configuration.module';
import { MailerModule } from '@nestjs-modules/mailer';

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
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          auth: {
            user: configService.get('EMAIL_USERNAME'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
    OrganizationModule,
    FacultyPersonModule,
    FaqsModule,
    ClubModule,
    EmailConfigurationModule,
  ],
  controllers: [MasterDataController],
  providers: [JwtService, ConfigService],
})
export class MasterDataModule {}
