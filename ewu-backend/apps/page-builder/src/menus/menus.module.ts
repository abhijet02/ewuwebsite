import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../../../../prisma/prisma.module';
//import { PrismaService } from '../../../../prisma/prisma-user.service';

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
    MenusResolver, 
    MenusService,
   // PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class MenusModule {}
