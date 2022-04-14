import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaSpaceService } from 'src/shopee/services';

@Controller('media-space')
export class MediaSpaceController {
  constructor(private readonly service: MediaSpaceService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    return this.service.uploadImage(image);
  }
}
