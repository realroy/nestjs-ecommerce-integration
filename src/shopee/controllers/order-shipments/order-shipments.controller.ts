import { Controller, Get, Query, Req } from '@nestjs/common';

import { AuthorizedRequest } from 'src/shopee/dto';
import { GetOrderShipmentListQuery } from 'src/shopee/dto/get-order-shipment-list-query.dto';
import { OrderShipmentsService } from 'src/shopee/services';

@Controller('orders/shipments')
export class OrderShipmentsController {
  constructor(private readonly service: OrderShipmentsService) {}

  @Get()
  getOrders(
    @Req() req: AuthorizedRequest,
    @Query() query: GetOrderShipmentListQuery,
  ) {
    return this.service.getList({
      shopId: req.shopId,
      pageSize: +query.pageSize,
      cursor: query.cursor,
    });
  }
}
