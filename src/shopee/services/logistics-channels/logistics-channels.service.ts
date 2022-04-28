import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { UpdateLogisticChannelBodyDto } from 'src/shopee/dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class LogisticsChannelsService extends TokensService {
  async getChannels(shopId: string) {
    const path = '/api/v2/logistics/get_channel_list';
    const url = await this.createSignedUrlWithAccessToken(path, shopId, {
      shop_id: shopId,
    });
    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }

  async updateChannel(dto: UpdateLogisticChannelBodyDto & { shopId: string }) {
    const path = '/api/v2/logistics/update_channel';
    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const { data } = await firstValueFrom(
      this.httpService.post(url, {
        logistics_channel_id: dto.logisticsChannelId,
        ...(dto.enabled ? { enabled: dto.enabled } : {}),
        ...(dto.preferred ? { preferred: dto.preferred } : {}),
        ...(dto.codEnabled ? { cod_enabled: dto.codEnabled } : {}),
      }),
    );

    return data;
  }
}
