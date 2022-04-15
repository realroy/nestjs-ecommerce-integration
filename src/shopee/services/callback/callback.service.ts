import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ShopEntity, TokenEntity } from 'src/shopee/entities';
import { ConfigService } from '../config.service';
import { generateHmac, generateTimestamp } from '../utils';

@Injectable()
export class CallbackService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,

    @InjectRepository(ShopEntity)
    private shopRepository: Repository<ShopEntity>,

    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async createOrUpdateShopSession(code: string, shopId?: string) {
    const partnerId = this.configService.get('partnerId');

    await this.shopRepository
      .createQueryBuilder()
      .insert()
      .into(ShopEntity)
      .values({ code, shopId, partnerId })
      .orUpdate(['code', 'partnerId'], ['shopId'])
      .execute();

    const path = '/api/v2/auth/token/get';
    const timestamp = generateTimestamp();

    const body = {
      code,
      partner_id: +partnerId,
      shop_id: +shopId,
    };

    const url = new URL(path, this.configService.get('baseUrl'));
    url.search = new URLSearchParams({
      partner_id: partnerId,
      timestamp,
      sign: generateHmac(
        this.configService.get('partnerKey'),
        partnerId,
        path,
        timestamp,
      ),
    }).toString();

    const { data } = await firstValueFrom(
      this.httpService.post(url.toString(), body),
    );

    if (data.error.length) {
      throw new Error(data.error + data.message);
    }

    const token = await this.tokenRepository
      .createQueryBuilder()
      .insert()
      .into(TokenEntity)
      .values({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiredAt: new Date(Date.now() + +data.expire_in),
        partnerId,
      })
      .execute();

    return token;
  }
}
