import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
} from '@nestjs/common';

import {
  AuthorizedRequest,
  CancelOrderBody,
  CancelOrderParam,
  GetOrderListQuery,
} from 'src/shopee/dto';
import { OrdersService } from 'src/shopee/services';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  getOrders(@Req() req: AuthorizedRequest, @Query() query: GetOrderListQuery) {
    return this.service.getList({
      shopId: req.shopId,
      ...query,
    });
  }

  @Patch('/:orderSn/cancel')
  cancelOrder(
    @Req() req: AuthorizedRequest,
    @Param() param: CancelOrderParam,
    @Body() body: CancelOrderBody,
  ) {
    return this.service.cancel({
      shopId: req.shopId,
      orderSn: param.orderSn,
      ...body,
    });
  }
}
