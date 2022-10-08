import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetAccessTokenResponse } from 'src/shopee/dto';

import { TokenEntity } from 'src/shopee/entities';
import { CreateSignedUrl, HttpClient } from 'src/shopee/libs';
import { ShopeeConfig } from 'src/shopee/shopee.config';

@Injectable()
export class RenewRefreshTokenService {
  constructor(
    private readonly createSignedUrl: CreateSignedUrl,
    private readonly config: ConfigService,
    private readonly httpClient: HttpClient,
  ) {}

  async call(shopId: string, refreshToken: string) {
    const [partnerId, partnerKey, baseUrl] = [
      'partnerId',
      'partnerKey',
      'baseUrl',
    ].map((key: keyof ShopeeConfig) => this.config.get(key));

    const path = '/api/v2/auth/access_token/get';

    const url = this.createSignedUrl.call(path, {
      partner_id: partnerId,
    });

    const body = {
      refresh_token: refreshToken,
      partner_id: +partnerId,
      shop_id: +shopId,
    };

    const firstValue = await firstValueFrom(
      this.httpClient.post(url.toString(), body),
    );

    const data = firstValue.data as unknown as GetAccessTokenResponse;

    if (data?.error?.length) {
      throw new Error(data?.error + data?.message);
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
