import { Controller, Get, Put, Query } from '@nestjs/common';

import { GetLogisticChannelsQueryDto } from 'src/shopee/dto';
import { LogisticsChannelsService } from 'src/shopee/services';

@Controller('logistics/channels')
export class LogisticsChannelsController {
  constructor(private readonly service: LogisticsChannelsService) {}

  @Get()
  getChannels(@Query() query: GetLogisticChannelsQueryDto) {
    return this.service.getChannels(query.shopId);
  }

  @Put()
  updateChannel() {
    return null;
  }
}
