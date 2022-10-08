import { Injectable } from '@nestjs/common';

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
      category_id: categoryId,
      access_token: accessToken,
      shop_id: shopId,
    });

    const res = await this.httpClient.get(url);
    return res.data;
  }
}
