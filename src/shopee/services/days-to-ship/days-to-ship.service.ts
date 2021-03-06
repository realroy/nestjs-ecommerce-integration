import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class DaysToShipService extends TokensService {
  async getLimit(shopId: string, categoryId: string) {
    const path = '/api/v2/product/get_dts_limit';
    const url = await this.createSignedUrlWithAccessToken(path, shopId, {
      shop_id: shopId,
      category_id: categoryId,
    });

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
