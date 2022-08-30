import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateBuyerCancellation } from 'src/shopee/dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class BuyerCancellationService extends TokensService {
  async create(dto: CreateBuyerCancellation) {
    const path = '/api/v2/order/handle_buyer_cancellation';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const { data } = await firstValueFrom(
      this.httpService.post(url, {
        order_sn: dto.orderSn,
        operation: dto.operation,
      }),
    );

    this.throwIfError(data);

    return data;
  }
}
