import { DynamicModule, Module, ValidationPipe } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';

import { ShopeeConfig } from './shopee.config';
import * as services from './services';
import * as controllers from './controllers';
import * as entities from './entities';

@Module({})
export class ShopeeModule {
  static register(config?: ShopeeConfig): DynamicModule {
    return {
      imports: [
        HttpModule.register({}),
        TypeOrmModule.forFeature(Object.values(entities)),
      ],
      module: ShopeeModule,
      providers: [
        {
          provide: 'CONFIG',
          useValue: config,
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
        ...Object.values(services),
      ],
      controllers: [...Object.values(controllers)],
    };
  }
}
