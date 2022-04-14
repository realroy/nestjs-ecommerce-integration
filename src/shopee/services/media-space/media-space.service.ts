import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as Sharp from 'sharp';
import * as FormData from 'form-data';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../base/base.service';
import { ConfigService } from '../config.service';
import { ImageEntity } from 'src/shopee/entities';

@Injectable()
export class MediaSpaceService extends BaseService {
  constructor(
    protected readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {
    super(configService);
  }

  async uploadImage(image: Express.Multer.File) {
    const url = this.createSignedUrl('/api/v2/media_space/upload_image');
    const processedImage = await this.resizeImage(
      image.buffer,
      80,
      10,
      2_000_000,
    );

    const form = new FormData();

    form.append('image', processedImage, {
      filename: `${Date.now()}.jpeg`,
      contentType: 'image/jpeg',
    });
    form.append('scene', '');
    form.append('partner_id', this.configService.get('partnerId'));

    const { data } = await firstValueFrom(
      this.httpService.post(url.toString(), form, {
        headers: form.getHeaders(),
      }),
    );

    if (data.error.length) {
      throw new Error(data.error + ' ' + data.message);
    }

    const newImage = new ImageEntity();
    const { image_info = {} } = data.response ?? {};

    newImage.imageId = image_info?.image_id ?? {};
    newImage.imageUrlList = image_info?.image_url_list ?? {};

    await this.imageRepository.create(newImage);

    return newImage;
  }

  private async resizeImage(
    buffer: Buffer,
    quality: number,
    drop: number,
    byteSize = 2_000_000,
  ) {
    const processedImage = Sharp(buffer).jpeg({ quality });
    const processedImageBuffer = await processedImage.toBuffer();
    if (processedImageBuffer.byteLength > byteSize) {
      await this.resizeImage(
        processedImageBuffer,
        quality - drop,
        drop,
        byteSize,
      );
    }

    return processedImageBuffer;
  }
}
