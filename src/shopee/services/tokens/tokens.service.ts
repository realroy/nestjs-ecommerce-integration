import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';

import { ConfigService } from '../config.service';
import { BaseService } from '../base/base.service';
import { TokenEntity } from 'src/shopee/entities';
import { generateHmac, generateTimestamp } from '../utils';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TokensService extends BaseService {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,

    @InjectRepository(TokenEntity)
    protected tokenRepository: Repository<TokenEntity>,
  ) {
    super(configService);
  }

  protected async getAccessToken(shopId: string | number) {
    const tokens = await this.tokenRepository.find({
      take: 1,
      order: { updatedAt: 'DESC' },
    });
    const [token] = tokens;

    if (!token.isExpired) {
      return token?.accessToken;
    }

    const { access_token: accessToken } = await this.renewRefreshToken(
      shopId,
      token.refreshToken,
    );

    return accessToken;
  }

  protected async createSignedUrlWithAccessToken(
    path: string,
    shopId: string,
    additionalParams: Record<string, string | number> = {},
  ) {
    const partnerId = this.configService.get('partnerId');
    const partnerKey = this.configService.get('partnerKey');

    const accessToken = await this.getAccessToken(shopId);
    const timestamp = generateTimestamp();

    const url = new URL(path, this.configService.get('baseUrl'));
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

  private async renewRefreshToken(
    shopId: string | number,
    refreshToken: string,
  ) {
    console.log('renewRefreshToken');
    const partnerId = this.configService.get('partnerId');

    const path = '/api/v2/auth/access_token/get';
    const timestamp = generateTimestamp();

    const body = {
      refresh_token: refreshToken,
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

    await this.tokenRepository
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

    return data as { access_token: string };
  }
}
