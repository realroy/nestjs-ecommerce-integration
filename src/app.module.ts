import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopeeModule } from './shopee';

@Module({
  imports: [
    ShopeeModule.register({
      partnerId: process.env.SHOPEE_PARTNER_ID,
      partnerKey: process.env.SHOPEE_PARTNER_KEY,
      redirectUrl: process.env.SHOPEE_REDIRECT_BASE_URL,
      baseUrl: process.env.SHOPEE_API_BASE_URL,
    }),
    TypeOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
