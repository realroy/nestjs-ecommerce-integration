import { DynamicModule, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import LazadaConfig from './lazada.config';

@Module({})
export class LazadaModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(ShopIdMiddleware)
  //     .exclude(
  //       { path: '/auth-partner', method: RequestMethod.ALL },
  //       { path: '/callback', method: RequestMethod.ALL },
  //     )
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }

  static register(config?: LazadaConfig): DynamicModule {
    return {
      imports: [
        // HttpModule.register({}),
        // TypeOrmModule.forFeature(Object.values(entities)),
      ],
      module: LazadaModule,
      providers: [
        {
          provide: 'CONFIG',
          useValue: config,
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
        // ...Object.values(services),
      ],
      controllers: [
        // ...Object.values(controllers)
      ],
    };
  }
}
