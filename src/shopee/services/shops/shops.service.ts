import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ShopEntity } from 'src/shopee/entities';

import { LogisticsChannelsService } from '../logistics-channels/logistics-channels.service';
import { REPOSITORY } from 'src/shopee/constants';

@Injectable()
export class ShopsService {
  constructor(
    @Inject(REPOSITORY.SHOPS)
    private shopRepository: Repository<ShopEntity>,
    private logisticsChannelService: LogisticsChannelsService,
  ) {}

  getMany() {
    return this.shopRepository.find({});
  }

  // async create(shopId: string) {
  //   const { response } = await this.logisticsChannelService.getChannels(shopId);
  //   const { logistics_channel_list: logisticsChannelList } = response;

  //   for await (const channel of logisticsChannelList) {
  //     this.logisticsChannelService.updateChannel({
  //       shopId,
  //       logisticsChannelId: channel.logistics_channel_id,
  //       enabled: true,
  //     });
  //   }
  // }
}
