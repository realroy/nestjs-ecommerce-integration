import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { GetAccessTokenResponse } from 'src/shopee/dto';
import { ShopEntity, TokenEntity } from 'src/shopee/entities';
import { CreateSignedUrl, HttpClient } from 'src/shopee/libs';

import { ConfigService } from '../config.service';
import { wrapTypeormTransaction } from 'src/shopee/utils';
import { PRIMARY_DATABASE_PROVIDER } from 'src/shopee/constants';

@Injectable()
export class CallbackService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpClient: HttpClient,
    private readonly createSignedUrl: CreateSignedUrl,
    @Inject(PRIMARY_DATABASE_PROVIDER)
    private readonly dataSource: DataSource,
  ) {}

  async createOrUpdateShopSession(code: string, sign: string, shopId?: string) {
    const token = await wrapTypeormTransaction<TokenEntity>({
      queryRunner: this.dataSource.createQueryRunner(),
      execute: async (manager) => {
        const partnerId = this.config.get('partnerId');
        const shop = await manager.findOneByOrFail(ShopEntity, {
          id: shopId,
          partnerId,
          signData: sign,
        });

        shop.code = code;

        await manager.save(shop);

        const path = '/api/v2/auth/token/get';

        const body = {
          code,
          partner_id: +partnerId,
          shop_id: +shopId,
        };

        const url = this.createSignedUrl.call(path);

        const res = await this.httpClient.post(url, body);
        const data = res.data as unknown as GetAccessTokenResponse;

        if (data?.error?.length) {
          throw new Error(data.error + data.message);
        }

        const token = new TokenEntity();
        token.id = ((await TokenEntity.count()) + 1).toString();
        token.accessToken = data.access_token;
        token.refreshToken = data.refresh_token;
        token.expiredAt = new Date(Date.now() + +data.expire_in * 1_000);
        token.partnerId = partnerId;
        token.shopId = shopId;

        await manager
          .createQueryBuilder()
          .insert()
          .into(TokenEntity)
          .values(token)
          .orUpdate(
            ['access_token', 'refresh_token', 'expired_at', 'partner_id'],
            ['shop_id'],
          )
          .execute();

        return token;
      },
    });

    return token;
  }
}
