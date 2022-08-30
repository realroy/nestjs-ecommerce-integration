import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { GetOrderShipmentList } from 'src/shopee/dto/get-order-shipment-list.dto';

import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class OrderShipmentsService extends TokensService {
  async getList(dto: GetOrderShipmentList) {
    const path = '/api/v2/order/get_shipment_list';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
      page_size: dto.pageSize,
      ...(dto.cursor && { cursor: dto.cursor }),
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
}
