import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CreateSignedUrl, HttpClient } from 'src/shopee/libs';

@Injectable()
export class AttributesService {
  constructor(
    private readonly createSignedUrl: CreateSignedUrl,
    private readonly httpClient: HttpClient,
  ) {}

  async getAttributes(shopId: string, categoryId: string, accessToken: string) {
    const path = '/api/v2/product/get_attributes';

    const url = this.createSignedUrl.call(path, {
      accessToken,
      category_id: categoryId,
      shop_id: shopId,
    });

    const { data } = await firstValueFrom(this.httpClient.get(url));

    return data;
  }
}
