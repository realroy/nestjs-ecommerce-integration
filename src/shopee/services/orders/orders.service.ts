import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

import { GetOrderListDto } from 'src/shopee/dto';
import { ShopEntity, TokenEntity } from 'src/shopee/entities';
import { OrderTimeRangeFieldEnum } from 'src/shopee/enums';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class OrdersService extends TokensService {
  async getList(dto: GetOrderListDto & { shopId: string }) {
    const path = '/api/v2/order/get_order_list';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
      time_range_field: dto.timeRangeField,
      time_from: dto.timeFrom,
      time_to: dto.timeTo,
      page_size: dto.pageSize,
      ...(dto.cursor && { cursor: dto.cursor }),
      ...(dto.orderStatus && { order_status: dto.orderStatus }),
      ...(dto.responseOptionalFields && {
        response_optional_fields: dto.responseOptionalFields,
      }),
    });

    const { data } = await firstValueFrom(this.httpService.get(url));

    if (data?.error) {
      throw new Error([data?.error, data?.message].join(' '));
    }

    const {
      more,
      next_cursor: nextCursor,
      order_list: orderList,
    } = data.response;

    return {
      more,
      nextCursor,
      orderList,
    };
  }

  private get activeTokenGenerator() {
    // return async function* activeTokenGenerator() {
    //   const take = 100;
    //   let round = 0;
    //   const options = { skip: round * take, take };

    //   // const tokens = await TokenEntity.getActives(options);
    //   const tokens = null;
    //   while (tokens) {
    //     yield tokens;
    //     round += 1;
    //     options.skip = round * take;
    //   }
    // };
    return '';
  }

  // @Cron('* * * * *')
  async sync() {
    // const generator = this.activeTokenGenerator;

    // for await (const tokenBatch of generator()) {
    //   const shops = [];
    //   for await (const token of tokenBatch) {
    //     const shop = await token.shop;
    //     const timeFrom = shop.ordersSyncAt;
    //     const timeTo = new Date(timeFrom.getTime() * 60_000);

    //     const ordersSyncAt = new Date();
    //     try {
    //       const orders = await this.getList({
    //         shopId: token.shopId,
    //         timeRangeField: OrderTimeRangeFieldEnum.CreateTime,
    //         timeFrom,
    //         timeTo,
    //         pageSize: 100,
    //         cursor: '',
    //         responseOptionalFields: 'order_status',
    //       });

    //       await this.configService.get('onSyncOrders')(orders);

    //       shop.ordersSyncAt = ordersSyncAt;
    //       shops.push(shop);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    //   await ShopEntity.save(shops);
    // }
    return '';
  }
}
