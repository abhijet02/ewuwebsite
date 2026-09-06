import { Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { BuilderResolver } from './builder.resolver';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SectionResolver } from './section.resolver';
import { SectionService } from './section.service';

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
    JwtService,
    ConfigService,
    BuilderResolver, 
    BuilderService,
    SectionResolver,
    SectionService
  ],
})
export class BuilderModule {}
