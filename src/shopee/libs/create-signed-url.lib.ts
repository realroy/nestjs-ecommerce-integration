import { Injectable } from '@nestjs/common';

import { ConfigService } from 'src/shopee/services';
import { AdditionalParams } from 'src/shopee/types';

import { generateHmac, generateTimestamp } from '../services/utils';

@Injectable()
export default class CreateSignedUrl {
  constructor(private readonly config: ConfigService) {}

  call(path: string, params = {} as AdditionalParams) {
    const partnerId = this.config.get('partnerId');
    const partnerKey = this.config.get('partnerKey');
    const baseUrl = this.config.get('baseUrl');

    const parsedParams = Object.keys(params)
      .sort()
      .reduce(
        (prev, key) => ({ ...prev, [key]: params[key].toString() }),
        {} as Record<string, string>,
      );

    const timestamp = generateTimestamp();

    const url = new URL(path, baseUrl);

    url.search = new URLSearchParams({
      partner_id: partnerId,
      timestamp,
      ...(parsedParams.accessToken && {
        access_token: parsedParams.accessToken,
      }),
      ...params,
      sign: generateHmac(
        partnerKey,
        partnerId,
        path,
        timestamp,
        ...Object.values(parsedParams),
      ),
    }).toString();

    return url.toString();
  }
}
