import { Controller, Get, Query, Req } from '@nestjs/common';

import { AuthorizedRequest } from 'src/shopee/dto';
import { GetOrderListQueryDto } from 'src/shopee/dto/get-order-list-query.dto';
import { OrdersService } from 'src/shopee/services';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  getOrders(
    @Req() req: AuthorizedRequest,
    @Query() query: GetOrderListQueryDto,
  ) {
    return this.service.getList({
      shopId: req.shopId,
      ...query,
    });
  }
}
