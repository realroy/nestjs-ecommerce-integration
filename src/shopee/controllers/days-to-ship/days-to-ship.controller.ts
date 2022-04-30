import { Controller, Get, Query, Req } from '@nestjs/common';
import { AuthorizedRequest } from 'src/shopee/dto';
import { GetDaysToShipQueryDto } from 'src/shopee/dto/get-days-to-ship-query.dto';
import { DaysToShipService } from 'src/shopee/services';

@Controller('days-to-ship')
export class DaysToShipController {
  constructor(private readonly service: DaysToShipService) {}

  @Get()
  getDaysToShipLimit(
    @Req() req: AuthorizedRequest,
    @Query() query: GetDaysToShipQueryDto,
  ) {
    return this.service.getLimit(req.shopId, query.categoryId);
  }
}
