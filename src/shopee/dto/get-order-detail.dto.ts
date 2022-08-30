import { IsString } from 'class-validator';

import { GetOrderDetailQuery } from './get-order-detail-query.dto';

export class GetOrderDetail extends GetOrderDetailQuery {
  @IsString()
  shopId: string;
}
