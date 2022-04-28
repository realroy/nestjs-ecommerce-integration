import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';

import {
  GetLogisticChannelsQueryDto,
  UpdateLogisticChannelBodyDto,
} from 'src/shopee/dto';
import { LogisticsChannelsService } from 'src/shopee/services';

@Controller('logistics/channels')
export class LogisticsChannelsController {
  constructor(private readonly service: LogisticsChannelsService) {}

  @Get()
  getChannels(@Query() query: GetLogisticChannelsQueryDto) {
    return this.service.getChannels(query.shopId);
  }

  @Post()
  createChannel(@Body() body: UpdateLogisticChannelBodyDto) {
    const shopId = '45291';
    return this.service.updateChannel({ shopId, ...body });
  }

  @Put()
  updateChannel(@Body() body: UpdateLogisticChannelBodyDto) {
    const shopId = '45291';
    return this.service.updateChannel({ shopId, ...body });
  }
}
