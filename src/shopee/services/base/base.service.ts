import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config.service';
import { generateHmac, generateTimestamp } from '../utils';

export class BaseService {
  constructor(protected readonly configService: ConfigService) {}

  protected createSignedUrl(
    path: string,
    additionalParams: Record<string, string | number> = {},
  ) {
    const partnerId = this.configService.get('partnerId');

    const timestamp = generateTimestamp();

    const url = new URL(path, this.configService.get('baseUrl'));
    const partnerKey = this.configService.get('partnerKey');
    url.search = new URLSearchParams({
      partner_id: partnerId,
      timestamp,
      ...additionalParams,
      sign: generateHmac(
        partnerKey,
        partnerId,
        path,
        timestamp,
        ...Object.values(additionalParams),
      ),
    }).toString();

    return url.toString();
  }
}
