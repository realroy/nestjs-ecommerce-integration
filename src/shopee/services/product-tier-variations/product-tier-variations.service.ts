import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  CreateTierVariationBodyDto,
  UpdateTierVariationBodyDto,
} from 'src/shopee/dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class ProductTierVariationsService extends TokensService {
  async updateTierVariation(
    dto: UpdateTierVariationBodyDto & { shopId: string },
  ) {
    const path = '/api/v2/product/update_tier_variation';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.itemId,
      tier_variation: dto.tierVariation.map((tierVariation) => ({
        name: tierVariation.name,
        option_list: tierVariation.optionList.map((option) => ({
          option: option.option,
          ...(option.image ? { image: option.image.image_id } : {}),
        })),
      })),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }

  async initTierVariation(
    dto: CreateTierVariationBodyDto & { shopId: string },
  ) {
    const path = '/api/v2/product/init_tier_variation';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.itemId,
      tier_variation: dto.tierVariation.map((tierVariation) => ({
        name: tierVariation.name,
        option_list: tierVariation.optionList.map((option) => ({
          option: option.option,
          ...(option.image ? { image: option.image.image_id } : {}),
        })),
      })),
      model: dto.model.map((eachModel) => ({
        tier_index: eachModel.tierIndex,
        normal_stock: eachModel.normalStock,
        original_price: eachModel.originalPrice,
        ...(eachModel.modelSku ? { model_sku: eachModel.modelSku } : {}),
      })),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }
}
