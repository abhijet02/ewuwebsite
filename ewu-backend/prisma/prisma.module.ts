import { Module } from '@nestjs/common';
import { PrismaPageBuilderService } from './prisma-page-builder.service';
import { PrismaUserService } from './prisma-user.service';
import { PrismaMasterDataService } from './prisma-master-data.service';

@Module({
  providers: [
    PrismaUserService,
    PrismaPageBuilderService,
    PrismaMasterDataService,
  ],
  exports: [
    PrismaUserService,
    PrismaPageBuilderService,
    PrismaMasterDataService,
  ],
})
export class PrismaModule {}
