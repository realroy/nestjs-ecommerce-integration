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
import { DataSource } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';

import { ShopeeConfig } from './shopee.config';
import * as services from './services';
import * as controllers from './controllers';
import * as libs from './libs';
import * as entities from './entities';
import { ShopIdMiddleware } from './middlewares';
import { dataSourceOption } from 'src/data-source';
import {
  CONFIG_PROVIDER,
  PRIMARY_DATABASE_PROVIDER,
  REPOSITORY,
} from './constants';

const repositories = Object.values(entities)
  .map((entity) => ({
    provide: REPOSITORY[entity.NAME?.replace('shopee_', '')?.toUpperCase?.()],
    useFactory: (connection: DataSource) => connection.getRepository(entity),
    inject: [PRIMARY_DATABASE_PROVIDER],
  }))
  .filter(({ provide }) => !!provide);

@Module({})
export class ShopeeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopIdMiddleware)
      .exclude({ path: '/callback', method: RequestMethod.ALL })
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
          provide: CONFIG_PROVIDER,
          useValue: config,
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
        {
          provide: PRIMARY_DATABASE_PROVIDER,
          useFactory: async () => {
            const dataSource = await new DataSource({
              ...dataSourceOption,
              entities: Object.values(entities),
              migrations: [],
            }).initialize();
            return dataSource;
          },
        },
        ...Object.values(services),
        ...Object.values(libs),
        // ...Object.values(entities),
        ...repositories,
      ],
      controllers: [...Object.values(controllers)],
    };
  }
}
