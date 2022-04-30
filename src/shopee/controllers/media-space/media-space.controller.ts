import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorizedRequest } from 'src/shopee/dto';
import { MediaSpaceService } from 'src/shopee/services';

@Controller('media-space')
export class MediaSpaceController {
  constructor(private readonly service: MediaSpaceService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Req() req: AuthorizedRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const newImage = await this.service.uploadImage(image, req.shopId);

    return newImage.data;
  }
}
