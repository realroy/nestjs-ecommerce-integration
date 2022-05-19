import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { Raw } from 'typeorm';

import { TokenEntity } from 'src/shopee/entities';
import { ShopeeConfig } from 'src/shopee/shopee.config';
import { TokensService } from '../tokens/tokens.service';
import { generateTimestamp, generateHmac } from '../utils';

@Injectable()
export class RefreshTokensService extends TokensService {
  @Cron('0 0 * * *', { name: 'refreshToken' })
  async renew() {
    const [partnerId, partnerKey, baseUrl] = [
      'partnerId',
      'partnerKey',
      'baseUrl',
    ].map((key: keyof ShopeeConfig) => this.configService.get(key));

    const tokens = await TokenEntity.find({
      where: { expiredAt: Raw((alias) => `${alias} > NOW()`) },
    });

    for await (const token of tokens) {
      const path = '/api/v2/auth/access_token/get';
      const timestamp = generateTimestamp();

      const body = {
        refresh_token: token.refreshToken,
        partner_id: +partnerId,
        shop_id: +token.shopId,
      };

      const url = new URL(path, baseUrl);
      url.search = new URLSearchParams({
        partner_id: partnerId,
        timestamp,
        sign: generateHmac(partnerKey, partnerId, path, timestamp),
      }).toString();

      const now = Date.now();

      const { data } = await firstValueFrom(
        this.httpService.post(url.toString(), body),
      );

      if (data.error.length) {
        throw new Error(data.error + data.message);
      }

      token.accessToken = data.access_token;
      token.refreshToken = data.refresh_token;
      token.expiredAt = new Date(now + +data.expire_in);
      token.partnerId = partnerId;
    }

    await TokenEntity.save(tokens);
  }
}
