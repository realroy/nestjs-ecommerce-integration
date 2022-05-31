import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { ShopEntity, TokenEntity } from 'src/shopee/entities';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class CallbackService extends TokensService {
  async createOrUpdateShopSession(code: string, shopId?: string) {
    const partnerId = this.configService.get('partnerId');

    await ShopEntity.createQueryBuilder()
      .insert()
      .values({ id: shopId, code, partnerId, ordersSyncAt: new Date() })
      .orUpdate(['code', 'partner_id', 'orders_sync_at'], ['id'])
      .execute();

    const path = '/api/v2/auth/token/get';

    const body = {
      code,
      partner_id: +partnerId,
      shop_id: +shopId,
    };

    const url = this.createSignedUrl(path);
    const { data } = await firstValueFrom(this.httpService.post(url, body));

    if (data.error.length) {
      throw new Error(data.error + data.message);
    }
    console.log('expire_in', data.expire_in, Date.now());
    const token = await TokenEntity.createQueryBuilder()
      .insert()
      .values({
        id: ((await TokenEntity.count()) + 1).toString(),
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiredAt: new Date(Date.now() + +data.expire_in * 1_000),
        partnerId,
        shopId,
      })
      .orUpdate(
        ['access_token', 'refresh_token', 'expired_at', 'partner_id'],
        ['shop_id'],
      )
      .execute();

    return token;
  }
}
