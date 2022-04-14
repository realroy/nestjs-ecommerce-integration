import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config.service';
import { generateHmac, generateTimestamp } from '../utils';

export class BaseService {
  constructor(protected readonly configService: ConfigService) {}

  createSignedUrl(path: string) {
    const partnerId = this.configService.get('partnerId');

    const timestamp = generateTimestamp();

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

    return url.toString();
  }
}
