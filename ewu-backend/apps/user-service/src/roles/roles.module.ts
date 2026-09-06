import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminMenusResolver } from './admin-menu.resolver';
import { AdminMenusService } from './admin-menu.service';
import { RoleMenuPermissionsResolver } from './role-menu-permission.resolver';
import { RoleMenuPermissionsService } from './role-menu-permission.service';

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
    RolesResolver,
    RolesService,
    AdminMenusResolver,
    AdminMenusService,
    RoleMenuPermissionsResolver,
    RoleMenuPermissionsService,
    JwtService,
    ConfigService,
  ],
})
export class RolesModule {}
