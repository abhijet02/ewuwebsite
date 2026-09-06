import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../prisma/generated/master-data';

@Injectable()
export class PrismaMasterDataService
  extends PrismaClient
  implements OnModuleInit
{
  [x: string]: any;
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }
}
