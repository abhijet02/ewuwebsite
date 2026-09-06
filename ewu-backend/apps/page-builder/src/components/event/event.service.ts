import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import {
  CreateEventInput,
  CreateEventAttachmentInput,
  CreateEventSpeakerInput,
} from '../dto/create-events.input';
import { UpdateEventInput } from '../dto/update-event.input';
import {
  Event,
  EventSpeaker,
  EventAttachment,
} from '../entities/events.entity';
import * as path from 'path';
import {
  uploadFileStream,
  deleteFileAndDirectory,
} from 'utils/file-upload.util';

@Injectable()
export class EventService {
  private logger = new Logger('EventService');
  private uploadDir = path.join(process.env.UPLOAD_DIR, 'event', 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prisma: PrismaPageBuilderService,
  ) {}

  /** ------------------- CREATE ------------------- */
  async create(createInput: CreateEventInput, userId: number): Promise<Event> {
    try {
      /** Attachment file (main) */
      let mainAttachmentUrl: string | null = null;
      const isSlugExist = await this.findBySlug(createInput?.slug);
      if (isSlugExist)
        throw new HttpException('Slug already exist', HttpStatus.BAD_REQUEST);

      if (createInput.attachmentUrl) {
        const file: any = await createInput.attachmentUrl;
        const fileName = `${Date.now()}_${file.filename}`;
        mainAttachmentUrl = await uploadFileStream(
          file.createReadStream,
          this.uploadDir,
          fileName,
        );
      }

      /** Speakers */
      const speakers: EventSpeaker[] = createInput.eventSpeaker
        ? await Promise.all(
            createInput.eventSpeaker.map(
              async (spk: CreateEventSpeakerInput, idx) => {
                let photoUrl: string | null = null;
                if (spk?.photoUrl) {
                  const f: any = await spk.photoUrl;
                  const fn = `${Date.now()}_${idx}_${f.filename}`;
                  photoUrl = await uploadFileStream(
                    f.createReadStream,
                    this.uploadDir,
                    fn,
                  );
                }
                return { ...spk, photoUrl, createdBy: userId } as any;
              },
            ),
          )
        : [];

      /** Attachments (multi) */
      const attachments: EventAttachment[] = createInput.attachments
        ? await Promise.all(
            createInput.attachments.map(
              async (att: CreateEventAttachmentInput, idx) => {
                let url: string | null = null;
                if (att.attachmentUrl) {
                  const f: any = await att.attachmentUrl;
                  const fn = `${Date.now()}_${idx}_${f.filename}`;
                  url = await uploadFileStream(
                    f.createReadStream,
                    this.uploadDir,
                    fn,
                  );
                }
                return {
                  attachmentUrl: url,
                  attachmentName: att.attachmentName ?? null,
                  createdBy: userId,
                } as any;
              },
            ),
          )
        : [];

      return this.prisma.event.create({
        data: {
          ...createInput,
          attachmentUrl: mainAttachmentUrl,
          createdBy: userId,
          eventSpeaker: { create: speakers },
          attachments: { create: attachments },
        },
        include: { eventSpeaker: true, attachments: true },
      });
    } catch (e) {
      this.logger.error('Create Event error', e);
      throw new HttpException(
        `Error creating Event: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** ------------------- FIND ALL ------------------- */
  async findAll(page = 1, limit = 20, pageId?: number): Promise<Event[]> {
    const skip = (page - 1) * limit;
     const whereCondition = pageId ? { 
        OR: [
          { pageId: pageId }, // Original pageId
          { isCopiedTo: { has: pageId } } // Or in copied to array
        ]
      } : {};
    return this.prisma.event.findMany({
      orderBy: { fromDate: 'desc' },
      where: whereCondition,
      skip,
      take: limit,
      include: { eventSpeaker: true, attachments: true },
    });
  }

  /** ------------------- FIND ONE ------------------- */
  async findOne(id: number): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { eventSpeaker: true, attachments: true },
    });
    if (!event) throw new NotFoundException(`Event ID ${id} not found`);
    return event;
  }

  async findBySlug(slug: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: { eventSpeaker: true, attachments: true },
    });
    return event;
  }

  /** ------------------- UPDATE ------------------- */
  async update(
    id: number,
    input: UpdateEventInput,
    userId: number,
  ): Promise<Event> {
    try {
      const existing = await this.findOne(id);

      /** handle main attachment */
      let mainAttachmentUrl = existing?.attachmentUrl;
      if (input.attachmentUrl) {
        if (existing.attachmentUrl) {
          const prevPath = existing.attachmentUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevPath);
        }
        const file: any = await input.attachmentUrl;
        const fn = `${Date.now()}_${file.filename}`;
        mainAttachmentUrl = await uploadFileStream(
          file.createReadStream,
          this.uploadDir,
          fn,
        );
      }

      /** Replace speakers */
      let speakers: any[] = [];
      // remove old
      if (existing?.eventSpeaker?.length) {
        for (const s of existing.eventSpeaker) {
          if (s.photoUrl) {
            const p = s.photoUrl.replace(`${process.env.BASE_URL}/`, '');
            deleteFileAndDirectory(p);
          }
        }
        await this.prisma.eventSpeaker.deleteMany({ where: { eventId: id } });
      }
      if (input?.eventSpeaker) {
        // add new
        speakers = await Promise.all(
          input.eventSpeaker.map(async (spk, idx) => {
            let photoUrl = null;
            if (spk?.photoUrl) {
              const f: any = await spk?.photoUrl;
              const fn = `${Date.now()}_${idx}_${f.filename}`;
              photoUrl = await uploadFileStream(
                f.createReadStream,
                this.uploadDir,
                fn,
              );
            }
            return { ...spk, photoUrl, updatedBy: userId } as any;
          }),
        );
      }

      /** Replace attachments */
      let attachments: any[] = [];
      if (existing.attachments?.length) {
        for (const a of existing.attachments) {
          if (a.attachmentUrl) {
            const p = a.attachmentUrl.replace(`${process.env.BASE_URL}/`, '');
            deleteFileAndDirectory(p);
          }
        }
        await this.prisma.eventAttachment.deleteMany({
          where: { eventId: id },
        });
      }
      if (input?.attachments) {
        attachments = await Promise.all(
          input.attachments.map(async (att, idx) => {
            let url = null;
            if (att.attachmentUrl) {
              const f: any = await att.attachmentUrl;
              const fn = `${Date.now()}_${idx}_${f.filename}`;
              url = await uploadFileStream(
                f.createReadStream,
                this.uploadDir,
                fn,
              );
            }
            return {
              attachmentUrl: url,
              attachmentName: att.attachmentName ?? null,
              updatedBy: userId,
            } as any;
          }),
        );
      }

      return this.prisma.event.update({
        where: { id },
        data: {
          ...input,
          attachmentUrl: mainAttachmentUrl,
          updatedBy: userId,
          eventSpeaker: { deleteMany: {}, create: speakers },
          attachments: { deleteMany: {}, create: attachments },
        },
        include: { eventSpeaker: true, attachments: true },
      });
    } catch (e) {
      throw new HttpException(
        `Error updating Event: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** ------------------- DELETE ------------------- */
  async delete(id: number): Promise<Event> {
    const existing = await this.findOne(id);

    // remove main attachment
    if (existing.attachmentUrl) {
      const p = existing.attachmentUrl.replace(`${process.env.BASE_URL}/`, '');
      deleteFileAndDirectory(p);
    }

    // remove speaker files
    if (existing.eventSpeaker?.length) {
      for (const s of existing.eventSpeaker) {
        if (s.photoUrl) {
          const p = s.photoUrl.replace(`${process.env.BASE_URL}/`, '');
          deleteFileAndDirectory(p);
        }
      }
    }

    // remove attachment files
    if (existing.attachments?.length) {
      for (const a of existing.attachments) {
        if (a.attachmentUrl) {
          const p = a.attachmentUrl.replace(`${process.env.BASE_URL}/`, '');
          deleteFileAndDirectory(p);
        }
      }
    }

    await this.prisma.event.delete({ where: { id } });
    return existing;
  }
}
