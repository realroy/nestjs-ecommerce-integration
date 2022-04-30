import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class CategoriesService extends TokensService {
  async getCategories(shopId: string) {
    const path = '/api/v2/product/get_category';
    const url = await this.createSignedUrlWithAccessToken(path, shopId, {
      shop_id: +shopId,
    });

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
