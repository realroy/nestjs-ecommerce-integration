import { Controller, Get, Query } from '@nestjs/common';

import { CallBackQueryDto } from 'src/shopee/dto';
import { CallbackService } from 'src/shopee/services';

@Controller('callback')
export class CallbackController {
  constructor(private readonly service: CallbackService) {}

  @Get()
  async callback(@Query() query: CallBackQueryDto) {
    await this.service.createOrUpdateShopSession(query.code, query.shop_id);

    return { message: 'success' };
  }
}
