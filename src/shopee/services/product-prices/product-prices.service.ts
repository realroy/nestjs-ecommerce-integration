import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UpdateProductPricesBodyDto } from 'src/shopee/dto';

import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class ProductPricesService extends TokensService {
  async updateStock(
    dto: { id: string; shopId: string } & UpdateProductPricesBodyDto,
  ) {
    const path = '/api/v2/product/update_price';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.id,
      price_list: dto.priceList.map((price) => ({
        ...(price.modelId ? { model_id: price.modelId } : {}),
        original_price: price.originalPrice,
      })),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }
}
