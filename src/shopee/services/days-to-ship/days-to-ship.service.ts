import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class DaysToShipService extends TokensService {
  async getLimit(shopId: string, categoryId: string) {
    const path = '/api/v2/product/get_dts_limit';
    const accessToken = await this.getAccessToken(shopId);
    const url = this.createSignedUrlWithAccessToken(path, accessToken, shopId, {
      shop_id: shopId,
      access_token: accessToken,
      category_id: categoryId,
    });

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
