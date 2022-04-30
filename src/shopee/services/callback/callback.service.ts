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
      .values({ id: shopId, code, partnerId })
      .orUpdate(['code', 'partnerId'], ['id'])
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

    const token = await TokenEntity.createQueryBuilder()
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
        ['accessToken', 'refreshToken', 'expiredAt', 'partnerId'],
        ['shopId'],
      )
      .execute();

    return token;
  }
}
