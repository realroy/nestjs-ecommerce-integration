import { IsString } from 'class-validator';

import { CancelOrderBody } from './cancel-order-body.dto';

export class CancelOrder extends CancelOrderBody {
  @IsString()
  orderSn: string;

  @IsString()
  shopId: string;
}
