import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
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
}
