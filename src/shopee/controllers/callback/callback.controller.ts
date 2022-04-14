import { Controller, Get, Query } from '@nestjs/common';
import { CallbackService } from 'src/shopee/services/callback/callback.service';

@Controller('callback')
export class CallbackController {
  constructor(private readonly service: CallbackService) {}

  @Get()
  async callback(
    @Query('code') code: string,
    @Query('shop_id') shopId: string | null,
    @Query('main_account_id') mainAccountId: string,
  ) {
    const res = await this.service.createOrUpdateShopSession(code, shopId);
    console.log({ code, shopId, mainAccountId, res });

    return { message: 'success' };
  }
}
