import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config.service';
import { generateHmac, generateTimestamp } from '../utils';

@Injectable()
export class AuthPartnerService {
  constructor(private readonly configService: ConfigService) {}

  getAuthPartnerUrl() {
    const authPartnerPath = '/api/v2/shop/auth_partner';

    const authPartnerUrl = new URL(
      authPartnerPath,
      this.configService.get('baseUrl'),
    );

    const timestamp = generateTimestamp();

    const sign = generateHmac(
      this.configService.get('partnerKey'),
      this.configService.get('partnerId'),
      authPartnerPath,
      timestamp,
    );

    authPartnerUrl.search = new URLSearchParams({
      partner_id: this.configService.get('partnerId'),
      timestamp,
      sign,
      redirect: `${this.configService.get('redirectUrl')}/callback`,
    }).toString();

    return authPartnerUrl.toString();
  }

  getCancelAuthPartnerUrl() {
    const authPartnerPath = '/api/v2/shop/cancel_auth_partner';

    const authPartnerUrl = new URL(
      authPartnerPath,
      this.configService.get('baseUrl'),
    );

    const timestamp = generateTimestamp();

    const sign = generateHmac(
      this.configService.get('partnerKey'),
      this.configService.get('partnerId'),
      authPartnerPath,
      timestamp,
    );

    authPartnerUrl.search = new URLSearchParams({
      partner_id: this.configService.get('partnerId'),
      timestamp,
      sign,
      redirect: `${this.configService.get('redirectUrl')}/callback`,
    }).toString();

    return authPartnerUrl.toString();
  }
}
