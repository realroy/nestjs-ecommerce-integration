import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ShopeeConfig } from './shopee.config';

import * as services from './services';
import * as controllers from './controllers';
import * as entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaSpaceController } from './controllers/media-space/media-space.controller';
import { MediaSpaceService } from './services/media-space/media-space.service';

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
        ...Object.values(services),
      ],
      controllers: [...Object.values(controllers)],
    };
  }
}
