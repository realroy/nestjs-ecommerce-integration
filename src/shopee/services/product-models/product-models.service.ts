import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AddProductModelsDto } from 'src/shopee/dto';

import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class ProductModelsService extends TokensService {
  async add(dto: AddProductModelsDto) {
    const path = '/api/v2/product/add_model';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.id,
      model_list: dto.modelList.map((model) => ({
        tier_index: model.tierIndex,
        normal_stock: model.normalStock,
        original_price: model.originalPrice,
        ...(model.modelSku ? { model_sku: model.modelSku } : {}),
      })),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }

  update() {
    return {};
  }

  remove() {
    return {};
  }
}
