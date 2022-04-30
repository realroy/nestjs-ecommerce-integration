import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { TokenEntity } from 'src/shopee/entities';
import { GetBrandsStatusEnum } from 'src/shopee/enums';

import { BaseService } from '../base/base.service';
import { ConfigService } from '../config.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class BrandsService extends TokensService {
  async getBrands(
    shopId: number | string,
    pageSize: number | string,
    categoryId: number,
    offset: number | string = 0,
    status = GetBrandsStatusEnum.Normal,
    language?: string,
  ) {
    const path = '/api/v2/product/get_brand_list';
    const url = await this.createSignedUrlWithAccessToken(
      path,
      shopId.toString(),
      {
        shop_id: shopId.toString(),
        offset,
        page_size: pageSize,
        category_id: categoryId,
        status,
      },
    );

    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }
}
