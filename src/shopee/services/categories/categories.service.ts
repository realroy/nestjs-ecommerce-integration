import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { TokenEntity } from 'src/shopee/entities';
import { Repository } from 'typeorm';

import { BaseService } from '../base/base.service';
import { ConfigService } from '../config.service';

@Injectable()
export class CategoriesService extends BaseService {
  constructor(
    protected readonly configService: ConfigService,
    private readonly httpService: HttpService,

    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {
    super(configService);
  }

  async getCategories(shopId: string) {
    const path = '/api/v2/product/get_category';
    const tokens = await this.tokenRepository.find({
      take: 1,
      order: { updatedAt: 'DESC' },
    });

    const { accessToken } = tokens[0];

    const url = this.createSignedUrl(path, {
      access_token: accessToken,
      shop_id: shopId,
    });

    console.log({ url });

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
