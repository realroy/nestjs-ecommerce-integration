import { Injectable, Query } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class ProductsSizeChartService extends TokensService {
  async getSupportSizeChart(shopId: string, categoryId: string) {
    const path = '/api/v2/product/support_size_chart';
    const url = await this.createSignedUrlWithAccessToken(path, shopId, {
      category_id: categoryId,
      shop_id: shopId,
    });

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
