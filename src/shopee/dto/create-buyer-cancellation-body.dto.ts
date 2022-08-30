import { IsEnum } from 'class-validator';

import { BuyerCancellationOperation } from '../enums/buyer-cancellation-operation.enum';

export class CreateBuyerCancellationBody {
  @IsEnum(BuyerCancellationOperation)
  operation: BuyerCancellationOperation;
}
