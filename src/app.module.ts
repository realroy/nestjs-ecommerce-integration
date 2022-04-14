import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOption } from './data-source';
import { ShopeeModule } from './shopee';
import * as shopeeEntities from './shopee/entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dataSourceOption,
      entities: [...Object.values(shopeeEntities)],
      migrations: [],
    }),
    ShopeeModule.register({
      partnerId: process.env.SHOPEE_PARTNER_ID,
      partnerKey: process.env.SHOPEE_PARTNER_KEY,
      redirectUrl: process.env.SHOPEE_REDIRECT_BASE_URL,
      baseUrl: process.env.SHOPEE_API_BASE_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
