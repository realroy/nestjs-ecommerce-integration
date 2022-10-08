import { Inject, Injectable } from '@nestjs/common';

import { CONFIG_PROVIDER } from '../constants';
import { ShopeeConfig } from '../shopee.config';

@Injectable()
export class ConfigService {
  private readonly data: Record<string, any>;

  constructor(@Inject(CONFIG_PROVIDER) private config: ShopeeConfig) {
    this.data = config;
  }

  get(key: keyof ShopeeConfig): any {
    return this.data[key];
  }
}
