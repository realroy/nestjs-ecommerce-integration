import { Body, Controller, Param, Post, Req } from '@nestjs/common';

import { AuthorizedRequest, CreateBuyerCancellationBody } from 'src/shopee/dto';
import { CreateBuyerCancellationParam } from 'src/shopee/dto/create-buyer-cancellation-param.dto';
import { BuyerCancellationService } from 'src/shopee/services';

@Controller('orders/:orderSn')
export class OrderBuyerCancellationController {
  constructor(private readonly service: BuyerCancellationService) {}

  @Post('buyer-cancellation')
  create(
    @Req() req: AuthorizedRequest,
    @Param() param: CreateBuyerCancellationParam,
    @Body() body: CreateBuyerCancellationBody,
  ) {
    return this.service.create({ shopId: req.shopId, ...param, ...body });
  }
}
