import { Controller, Get, Query } from '@nestjs/common';
import { GetDaysToShipQueryDto } from 'src/shopee/dto/get-days-to-ship-query.dto';
import { DaysToShipService } from 'src/shopee/services';

@Controller('days-to-ship')
export class DaysToShipController {
  constructor(private readonly service: DaysToShipService) {}

  @Get()
  getDaysToShipLimit(@Query() query: GetDaysToShipQueryDto) {
    return this.service.getLimit(query.shopId, query.categoryId);
  }
}
