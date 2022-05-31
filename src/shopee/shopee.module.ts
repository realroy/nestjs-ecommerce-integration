import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';

import { ShopeeConfig } from './shopee.config';
import * as services from './services';
import * as controllers from './controllers';
import * as entities from './entities';
import { ShopIdMiddleware } from './middlewares';

@Module({})
export class ShopeeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopIdMiddleware)
      .exclude(
        { path: '/auth-partner', method: RequestMethod.ALL },
        { path: '/callback', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

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
