import { IsEnum, IsString } from 'class-validator';

import { BuyerCancellationOperation } from '../enums/buyer-cancellation-operation.enum';

export class CreateBuyerCancellation {
  @IsString()
  shopId: string;

  @IsString()
  orderSn: string;

  @IsEnum(BuyerCancellationOperation)
  operation: BuyerCancellationOperation;
}
