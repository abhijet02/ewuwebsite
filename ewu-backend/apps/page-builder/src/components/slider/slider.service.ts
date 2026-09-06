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
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { join } from 'path';
import { Slider } from '../entities/slider.entity';
import { CreateSliderInput } from '../dto/create-slider.input';
import { UpdateSliderInput } from '../dto/update-slider.input';

@Injectable()
export class SliderService {
  private logger = new Logger('Slider  service');

  private uploadDir = join(process.env.UPLOAD_DIR, `slider`, 'files');

  constructor(
    @Inject(PrismaPageBuilderService)
    private prismaService: PrismaPageBuilderService,
  ) {}

  async getFileUploadPath(
    createSliderInput: CreateSliderInput,
    key: string,
  ): Promise<string> {
    let filePath = '';
    if (createSliderInput[key]) {
      const imageFile: any = await createSliderInput[key];
      const fileName = `${Date.now()}_${imageFile.filename}`;
      filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
    }
    return await filePath;
  }

  async create(
    createSliderInput: CreateSliderInput,
    userId: number,
  ): Promise<Slider> {
    try {
      const sliderMediaUrl = await this.getFileUploadPath(
        createSliderInput,
        'sliderMediaUrl',
      );
      const watermarkLogourl = await this.getFileUploadPath(
        createSliderInput,
        'watermarkLogourl',
      );
      const countDownLogo = await this.getFileUploadPath(
        createSliderInput,
        'countDownLogo',
      );

      const banner1LogoUrl = await this.getFileUploadPath(
        createSliderInput,
        'banner1LogoUrl',
      );
      const banner2LogoUrl = await this.getFileUploadPath(
        createSliderInput,
        'banner2LogoUrl',
      );
      const createdSliderdata = this.prismaService.slider.create({
        data: {
          ...createSliderInput,
          sliderMediaUrl,
          watermarkLogourl,
          countDownLogo,
          banner1LogoUrl,
          banner2LogoUrl,
          createdBy: userId,
        },
      });

      this.logger.log(`Latest Notice Data: ${createdSliderdata}`);
      return createdSliderdata;
    } catch (e) {
      throw new HttpException(`Error Creating Latest Notice: ${e}`, 500);
    }
  }

  async findAll(page, limit): Promise<Slider[]> {
    return this.prismaService.slider.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Slider> {
    const slider = await this.prismaService.slider.findUnique({
      where: { id },
    });
    if (!slider) throw new NotFoundException(`slider with ID ${id} not found`);
    return slider;
  }

  async update(
    id: number,
    updateSliderInput: UpdateSliderInput,
    userId: number,
  ): Promise<Slider> {
    try {
      const isSliderExist: Slider = await this.prismaService.slider.findUnique({
        where: {
          id,
        },
      });
      if (isSliderExist) {
        let sliderInputData = {
          ...updateSliderInput,
          sliderMediaUrl: isSliderExist.sliderMediaUrl,
          watermarkLogourl: isSliderExist.watermarkLogourl,
          countDownLogo: isSliderExist.countDownLogo,
          banner1LogoUrl: isSliderExist.banner1LogoUrl,
          banner2LogoUrl: isSliderExist.banner2LogoUrl,
        };
        if (updateSliderInput?.sliderMediaUrl) {
          if (isSliderExist.sliderMediaUrl) {
            const prevSliderfilePath = isSliderExist?.sliderMediaUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevSliderfilePath);
          }
          const imageFile: any = await updateSliderInput?.sliderMediaUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          sliderInputData = {
            ...sliderInputData,
            sliderMediaUrl: await filePath,
          };
        }
        if (updateSliderInput?.watermarkLogourl) {
          if (isSliderExist.watermarkLogourl) {
            const prevWaterMarkLogofilePath =
              isSliderExist?.watermarkLogourl.replace(
                `${process.env.BASE_URL}/`,
                '',
              );
            deleteFileAndDirectory(prevWaterMarkLogofilePath);
          }
          const imageFile: any = await updateSliderInput.watermarkLogourl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          sliderInputData = {
            ...sliderInputData,
            watermarkLogourl: await filePath,
          };
        }
        if (updateSliderInput?.countDownLogo) {
          if (isSliderExist.countDownLogo) {
            const prevcountDownLogofilePath =
              isSliderExist?.countDownLogo.replace(
                `${process.env.BASE_URL}/`,
                '',
              );
            deleteFileAndDirectory(prevcountDownLogofilePath);
          }
          const imageFile: any = await updateSliderInput.countDownLogo;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          sliderInputData = {
            ...sliderInputData,
            countDownLogo: await filePath,
          };
        }
        if (updateSliderInput?.banner1LogoUrl) {
          if (isSliderExist.banner1LogoUrl) {
            const prevcountDownLogofilePath =
              isSliderExist?.banner1LogoUrl.replace(
                `${process.env.BASE_URL}/`,
                '',
              );
            deleteFileAndDirectory(prevcountDownLogofilePath);
          }
          const imageFile: any = await updateSliderInput.banner1LogoUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          sliderInputData = {
            ...sliderInputData,
            banner1LogoUrl: await filePath,
          };
        }
        if (updateSliderInput?.banner2LogoUrl) {
          if (isSliderExist.banner2LogoUrl) {
            const prevcountDownLogofilePath =
              isSliderExist?.banner2LogoUrl.replace(
                `${process.env.BASE_URL}/`,
                '',
              );
            deleteFileAndDirectory(prevcountDownLogofilePath);
          }
          const imageFile: any = await updateSliderInput.banner2LogoUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          sliderInputData = {
            ...sliderInputData,
            banner2LogoUrl: await filePath,
          };
        }
        const updatedSliderData = await this.prismaService.slider.update({
          data: {
            ...sliderInputData,
            updatedBy: userId,
          },
          where: {
            id,
          },
        });
        return updatedSliderData;
      } else {
        throw new HttpException('Slider not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Slider: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<Slider> {
    try {
      const isSliderExist: Slider = await this.findOne(id); // Ensure the notice exists
      if (isSliderExist) {
        await this.prismaService.slider.delete({ where: { id } });
        if (isSliderExist.sliderMediaUrl) {
          const prevSliderfilePath = isSliderExist.sliderMediaUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevSliderfilePath);
        }
        if (isSliderExist.watermarkLogourl) {
          const prevWaterMarkLogofilePath =
            isSliderExist?.watermarkLogourl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
          deleteFileAndDirectory(prevWaterMarkLogofilePath);
        }
        if (isSliderExist.countDownLogo) {
          const prevcountDownLogofilePath =
            isSliderExist?.countDownLogo.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
          deleteFileAndDirectory(prevcountDownLogofilePath);
        }
        if (isSliderExist.banner1LogoUrl) {
          const prevcountDownLogofilePath =
            isSliderExist?.banner1LogoUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
          deleteFileAndDirectory(prevcountDownLogofilePath);
        }
        if (isSliderExist.banner2LogoUrl) {
          const prevcountDownLogofilePath =
            isSliderExist?.banner2LogoUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
          deleteFileAndDirectory(prevcountDownLogofilePath);
        }
        return isSliderExist;
      }
    } catch (e) {
      throw new HttpException(`Error Updating Slider: ${e}`, 500);
    }
  }
}
