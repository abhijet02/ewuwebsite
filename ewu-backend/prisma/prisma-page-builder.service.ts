import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '../prisma/generated/page-builder'

@Injectable()
export class PrismaPageBuilderService extends PrismaClient implements OnModuleInit {
  [x: string]: any
  async onModuleInit() {
    // Note: this is optional
    await this.$connect()
  }
}