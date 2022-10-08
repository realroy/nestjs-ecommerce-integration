import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetAccessTokenResponse } from 'src/shopee/dto';

import { ShopEntity, TokenEntity } from 'src/shopee/entities';
import { CreateSignedUrl, HttpClient } from 'src/shopee/libs';
import dataSource from 'src/data-source';
import { ConfigService } from '../config.service';

@Injectable()
export class CallbackService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpClient: HttpClient,
    private readonly createSignedUrl: CreateSignedUrl,
  ) {}

  async createOrUpdateShopSession(code: string, sign: string, shopId?: string) {
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const partnerId = this.config.get('partnerId');
      const shop = await queryRunner.manager.findOneByOrFail(ShopEntity, {
        id: shopId,
        partnerId,
        signData: sign,
      });

      shop.code = code;

      await queryRunner.manager.save(shop);

      const path = '/api/v2/auth/token/get';

      const body = {
        code,
        partner_id: +partnerId,
        shop_id: +shopId,
      };

      const url = this.createSignedUrl.call(path);

      const res = await firstValueFrom(this.httpClient.post(url, body));
      const data = res.data as unknown as GetAccessTokenResponse;

      if (data?.error?.length) {
        throw new Error(data.error + data.message);
      }

      console.log('expire_in', data.expire_in, Date.now());
      // const token = await TokenEntity.createQueryBuilder()
      //   .insert()
      //   .values({
      //     id: ((await TokenEntity.count()) + 1).toString(),
      //     accessToken: data.access_token,
      //     refreshToken: data.refresh_token,
      //     expiredAt: new Date(Date.now() + +data.expire_in * 1_000),
      //     partnerId,
      //     shopId,
      //   })
      //   .orUpdate(
      //     ['access_token', 'refresh_token', 'expired_at', 'partner_id'],
      //     ['shop_id'],
      //   )
      //   .execute();
      const token = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(TokenEntity)
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

      queryRunner.commitTransaction();

      return token;
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }
  }
}
