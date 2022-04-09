import { DynamicModule, Module } from '@nestjs/common';

import * as services from './services';
import { ShopeeConfig } from './shopee.config';
import { ShopsController } from './controllers/shops/shops.controller';
import { ShopsService } from './services/shops/shops.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService]
})
export class ShopeeModule {
  static register(config?: ShopeeConfig): DynamicModule {
    return {
      imports: [],
      module: ShopeeModule,
      providers: [
        {
          provide: 'CONFIG',
          useValue: config,
        },
        ...Object.values(services),
      ],
      controllers: [],
    };
  }
}
