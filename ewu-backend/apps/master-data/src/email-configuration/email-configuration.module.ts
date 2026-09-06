import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HelpDeskService } from './help-desk.service';
import { HelpDeskResolver } from './help-desk.resolver';
import { EwuEmailResolver } from './ewu-email.resolver';
import { EwuEmailService } from './ewu-email.service';

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
    HelpDeskService,
    HelpDeskResolver,
    EwuEmailResolver,
    EwuEmailService,
    JwtService,
    ConfigService,
  ],
})
export class EmailConfigurationModule {}
