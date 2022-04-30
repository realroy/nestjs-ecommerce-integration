import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { TokenEntity } from 'src/shopee/entities';
import { Repository } from 'typeorm';

import { BaseService } from '../base/base.service';
import { ConfigService } from '../config.service';
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
