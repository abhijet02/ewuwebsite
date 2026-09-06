import { Injectable } from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import { CreateLiveSessionInput } from './dto/live-session.input';
import { UpdateLiveSessionInput } from './dto/live-session.input';
import { Publish } from '../../prisma/publish-type.enum';

@Injectable()
export class LiveSessionService {
  constructor(private readonly prisma: PrismaPageBuilderService) {}

  create(createLiveSessionInput: CreateLiveSessionInput, userId: number) {
    return this.prisma.liveSession.create({
      data: {
        ...createLiveSessionInput,
        createdBy: userId,
      },
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const session = this.prisma.liveSession.findMany({
      skip,
      take: limit,
      orderBy: { id: 'desc' },
    });

    return session;
  }

  findOne(id: number) {
    return this.prisma.liveSession.findUnique({ where: { id } });
  }

  findPublished() {
    return this.prisma.liveSession.findMany({
      where: { isPublished: Publish.YES },
      orderBy: { id: 'desc' },
    });
  }

  update(
    id: number,
    updateLiveSessionInput: UpdateLiveSessionInput,
    userId: number,
  ) {
    return this.prisma.liveSession.update({
      where: { id },
      data: {
        ...updateLiveSessionInput,
        updatedBy: userId,
        updateAt: new Date(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.liveSession.delete({ where: { id } });
  }
}
