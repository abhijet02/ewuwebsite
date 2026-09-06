import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaPageBuilderService } from '../../../../../prisma/prisma-page-builder.service';
import * as path from 'path';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { CreateQuote, UpdateQuote } from '../dto/create-quote.input';
import { Quote } from '../entities/quote.entity';

@Injectable()
export class QuoteService {
  private logger = new Logger('QuoteService');

  private uploadDir = path.join(process.env.UPLOAD_DIR, `qoute`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  /**
   * Create a new Quote date entry
   */

  async createQuote(createQuote: CreateQuote, userId: number): Promise<Quote> {
    try {
      // Handle file upload
      let imageUrl = null;
      let nextThumbnailUrl = null;
      if (createQuote?.imageUrl) {
        const imageFile: any = await createQuote.imageUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        imageUrl = await filePath;
      }

      if (createQuote?.nextThumbnailUrl) {
        const imageFile: any = await createQuote.nextThumbnailUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        const filePath = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
        nextThumbnailUrl = await filePath;
      }

      const newQuoteData = await this.prismaService.quotes.create({
        data: {
          ...createQuote,
          imageUrl,
          nextThumbnailUrl,
          createdBy: userId,
        },
      });
      this.logger.log(`Latest Notice Data: ${newQuoteData}`);
      return newQuoteData;
    } catch (e) {
      throw new HttpException(`Error Creating Latest Qoute: ${e}`, 500);
    }
  }

  /**
   * Get all Quote
   */
  async findAllQuotes(page: number = 1, limit: number = 10): Promise<Quote[]> {
    const skip = (page - 1) * limit; // Calculate how many records to skip

    return this.prismaService.quotes.findMany({
      orderBy: { createdAt: 'asc' }, // Sort by date in ascending order
      skip,
      take: limit, // Number of records to return
    });
  }

  //   /**
  //    * Find one important quote entry by ID
  //    */
  async findOneQuotes(id: number): Promise<Quote> {
    const qoute = await this.prismaService.quotes.findUnique({
      where: { id },
    });

    if (!qoute) {
      throw new NotFoundException(`quotes with ID ${id} not found`);
    }

    return qoute;
  }

  /**
   * Update an existing important date
   */
  async update(
    id: number,
    updateQuote: UpdateQuote,
    userId: number,
  ): Promise<Quote> {
    const existingData = await this.findOneQuotes(id); // Ensure it exists
    if (existingData) {
      let imageUrl = existingData?.imageUrl;
      let nextThumbnailUrl = existingData?.nextThumbnailUrl;

      if (updateQuote?.imageUrl) {
        if (existingData.imageUrl) {
          const prevfilePath = existingData.imageUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        // Handle new file upload
        const imageFile: any = await updateQuote?.imageUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        imageUrl = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
      }

      if (updateQuote?.nextThumbnailUrl) {
        if (existingData?.nextThumbnailUrl) {
          const prevfilePath = existingData?.nextThumbnailUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        // Handle new file upload
        const imageFile: any = await updateQuote?.nextThumbnailUrl;
        const fileName = `${Date.now()}_${imageFile.filename}`;
        nextThumbnailUrl = await uploadFileStream(
          imageFile.createReadStream,
          this.uploadDir,
          fileName,
        );
      }

      return this.prismaService.quotes.update({
        where: { id },
        data: {
          ...updateQuote,
          imageUrl,
          nextThumbnailUrl,
          updatedBy: userId,
        },
      });
    } else {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
  }

  /**
   * Delete an important date entry
   */
  async delete(id: number): Promise<Quote> {
    const isExist = await this.findOneQuotes(id); // Ensure it exists before deleting
    if (isExist) {
      if (isExist.imageUrl) {
        const prevfilePath = isExist.imageUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevfilePath);
      }
      await this.prismaService.quotes.delete({
        where: { id },
      });

      return isExist;
    } else {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
  }
}
