import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { ConfigService } from '../config.service';
import { BaseService } from '../base/base.service';
import { TokenEntity } from 'src/shopee/entities';
import { generateHmac, generateTimestamp } from '../utils';
import { ShopeeConfig } from 'src/shopee/shopee.config';

@Injectable()
export class TokensService extends BaseService {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService);
  }

  protected async getAccessToken(shopId: string) {
    const token = await TokenEntity.findOneByOrFail({ shopId });
    if (!token.isExpired) {
      return token?.accessToken;
    }

    console.log('AccessToken is expired');

    const { access_token: accessToken } = await this.renewRefreshToken(
      shopId,
      token.refreshToken,
    );

    return accessToken;
  }

  protected async createSignedUrlWithAccessToken(
    path: string,
    shopId: string,
    additionalParams: Record<
      string,
      string | number | string[] | number[]
    > = {},
  ) {
    const [partnerId, partnerKey, baseUrl] = [
      'partnerId',
      'partnerKey',
      'baseUrl',
    ].map((key: keyof ShopeeConfig) => this.configService.get(key));

    const accessToken = await this.getAccessToken(shopId);
    const timestamp = generateTimestamp();

    const url = new URL(path, baseUrl);
    url.search = new URLSearchParams({
      partner_id: partnerId,
      timestamp,
      access_token: accessToken,
      ...additionalParams,
      sign: generateHmac(
        partnerKey,
        partnerId,
        path,
        timestamp,
        accessToken,
        shopId,
      ),
    }).toString();

    return url.toString();
  }

  private async renewRefreshToken(shopId: string, refreshToken: string) {
    console.log('renew refresh token');
    const [partnerId, partnerKey, baseUrl] = [
      'partnerId',
      'partnerKey',
      'baseUrl',
    ].map((key: keyof ShopeeConfig) => this.configService.get(key));

    const path = '/api/v2/auth/access_token/get';
    const timestamp = generateTimestamp();

    const body = {
      refresh_token: refreshToken,
      partner_id: +partnerId,
      shop_id: +shopId,
    };

    const url = new URL(path, baseUrl);
    url.search = new URLSearchParams({
      partner_id: partnerId,
      timestamp,
      sign: generateHmac(partnerKey, partnerId, path, timestamp),
    }).toString();

    const { data } = await firstValueFrom(
      this.httpService.post(url.toString(), body),
    );

    if (data.error.length) {
      throw new Error(data.error + data.message);
    }

    await TokenEntity.createQueryBuilder()
      .insert()
      .values({
        id: (await TokenEntity.count()).toString(),
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiredAt: new Date(Date.now() + +data.expire_in),
        partnerId,
        shopId,
      })
      .orUpdate(
        ['access_token', 'refresh_token', 'expired_at', 'partner_id'],
        ['shop_id'],
      )
      .execute();

    return data as { access_token: string };
  }
}
