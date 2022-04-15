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
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,

    @InjectRepository(TokenEntity)
    protected tokenRepository: Repository<TokenEntity>,
  ) {
    super(configService, httpService, tokenRepository);
  }

  async getCategories(shopId: string) {
    const path = '/api/v2/product/get_category';
    const accessToken = await this.getAccessToken(shopId);
    const url = this.createSignedUrl(path, {
      access_token: accessToken,
      shop_id: shopId,
    });

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
