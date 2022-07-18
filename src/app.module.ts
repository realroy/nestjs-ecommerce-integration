import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOption } from './data-source';
import { ShopeeModule } from './shopee';
import { LazadaModule } from './lazada/lazada.module';
import * as shopeeEntities from './shopee/entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dataSourceOption,
      entities: [...Object.values(shopeeEntities)],
      synchronize: false,
      migrations: [],
    }),
    ShopeeModule.register({
      partnerId: process.env.SHOPEE_PARTNER_ID,
      partnerKey: process.env.SHOPEE_PARTNER_KEY,
      redirectUrl: process.env.SHOPEE_REDIRECT_BASE_URL,
      baseUrl: process.env.SHOPEE_API_BASE_URL,
    }),
    LazadaModule.register({
      appKey: process.env.LAZADA_APP_KEY,
      appSecret: process.env.LAZADA_APP_SECRET,
      apiEndpointUrl: process.env.apiEndpointUrl,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
