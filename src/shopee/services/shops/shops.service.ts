import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shopee/entities';
import { Repository } from 'typeorm';
import { LogisticsChannelsService } from '../logistics-channels/logistics-channels.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
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
