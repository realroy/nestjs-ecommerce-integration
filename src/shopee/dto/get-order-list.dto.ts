import { IsNumberString } from 'class-validator';

import { GetOrderListQuery } from './get-order-list-query.dto';

export class GetOrderListDto extends GetOrderListQuery {
  @IsNumberString()
  shopId: string;
}
