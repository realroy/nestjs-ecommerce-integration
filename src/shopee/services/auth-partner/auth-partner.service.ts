import { Injectable } from '@nestjs/common';
import { ShopEntity } from 'src/shopee/entities';

import { ConfigService } from '../config.service';
import { generateHmac, generateTimestamp } from '../utils';

@Injectable()
export class AuthPartnerService {
  constructor(private readonly configService: ConfigService) {}

  async getAuthPartnerUrl(shopId: string) {
    const url = this.getUrl('/api/v2/shop/auth_partner');

    await ShopEntity.createQueryBuilder()
      .insert()
      .values({
        id: shopId,
        partnerId: url.searchParams.get('partner_id'),
        signData: url.searchParams.get('sign'),
      })
      .orUpdate(['partner_id', 'signData'], ['id'])
      .execute();

    return url.toString();
  }

  async getCancelAuthPartnerUrl(shopId: string) {
    const url = this.getUrl('/api/v2/shop/cancel_auth_partner');

    await ShopEntity.delete({ id: shopId });

    return url.toString();
  }

  private getUrl(pathName: string) {
    const url = new URL(pathName, this.configService.get('baseUrl'));
    const partnerId = this.configService.get('partnerId');

    const timestamp = generateTimestamp();

    const sign = generateHmac(
      this.configService.get('partnerKey'),
      partnerId,
      pathName,
      timestamp,
    );

    const redirectUrl = new URL(
      'callback',
      this.configService.get('redirectUrl'),
    );

    redirectUrl.searchParams.append('sign', sign);
    url.searchParams.set('partner_id', partnerId);
    url.searchParams.set('redirect', redirectUrl.toString());
    url.searchParams.set('timestamp', timestamp);
    url.searchParams.set('sign', sign);

    return url;
  }
}
