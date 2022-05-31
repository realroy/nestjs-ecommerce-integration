import { Inject, Injectable } from '@nestjs/common';
import { ShopeeConfig } from '../shopee.config';

@Injectable()
export class ConfigService {
  private readonly data: Record<string, any>;

  constructor(@Inject('CONFIG') private config: ShopeeConfig) {
    this.data = config;
  }

  get(key: keyof ShopeeConfig): any {
    return this.data[key];
  }
}
