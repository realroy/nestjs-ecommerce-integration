import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';

import {
  AuthorizedRequest,
  UpdateLogisticChannelBodyDto,
} from 'src/shopee/dto';
import { LogisticsChannelsService } from 'src/shopee/services';

@Controller('logistics/channels')
export class LogisticsChannelsController {
  constructor(private readonly service: LogisticsChannelsService) {}

  @Get()
  getChannels(@Req() req: AuthorizedRequest) {
    return this.service.getChannels(req.shopId);
  }

  @Post()
  createChannel(
    @Req() req: AuthorizedRequest,
    @Body() body: UpdateLogisticChannelBodyDto,
  ) {
    return this.service.updateChannel({ shopId: req.shopId, ...body });
  }

  @Put()
  updateChannel(
    @Req() req: AuthorizedRequest,
    @Body() body: UpdateLogisticChannelBodyDto,
  ) {
    return this.service.updateChannel({ shopId: req.shopId, ...body });
  }
}
