import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as Sharp from 'sharp';
import * as FormData from 'form-data';

import { ImageEntity } from 'src/shopee/entities';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class MediaSpaceService extends TokensService {
  async uploadImage(image: Express.Multer.File, shopId?: string) {
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

    newImage.id = image_info?.image_id;
    newImage.data = data.response ?? {};
    shopId ? (newImage.shopId = shopId) : null;

    newImage.save();

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
