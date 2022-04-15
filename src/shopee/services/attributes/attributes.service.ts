import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AttributesService extends TokensService {
  async getAttributes(shopId: string, categoryId: string) {
    const path = '/api/v2/product/get_attributes';

    const url = await this.createSignedUrlWithAccessToken(path, shopId, {
      category_id: categoryId,
      shop_id: shopId,
    });

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
