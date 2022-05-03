import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  AddProductModelsDto,
  DeleteProductModelsDto,
  UpdateProductModelsDto,
} from 'src/shopee/dto';

import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class ProductModelsService extends TokensService {
  async add(dto: AddProductModelsDto) {
    const path = '/api/v2/product/add_model';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.productId,
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

  async update(dto: UpdateProductModelsDto) {
    const path = '/api/v2/product/update_model';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.productId,
      model: dto.model.map((eachModel) => ({
        model_id: eachModel.modelId,
        model_sku: eachModel.modelSku,
        ...(eachModel.preOrder
          ? {
              is_pre_order: eachModel.preOrder.isPreOrder,
              ...(eachModel.preOrder.isPreOrder
                ? { days_to_ship: eachModel.preOrder.dayToShip }
                : {}),
            }
          : {}),
      })),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }

  async remove(dto: DeleteProductModelsDto) {
    const path = '/api/v2/product/delete_model';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.productId,
      model_id: dto.modelId,
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }
}
