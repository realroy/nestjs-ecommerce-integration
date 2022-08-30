import {
  IsEnum,
  IsInt,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { CancelReason } from '../enums';

class Item {
  @IsInt()
  itemId: number;

  @IsInt()
  modelId: number;
}

export class CancelOrderBody {
  @IsEnum(CancelReason)
  cancelReason: CancelReason;

  @IsOptional()
  @ValidateIf(
    (o: CancelOrderBody) => o.cancelReason === CancelReason.OutOfStock,
  )
  @ValidateNested()
  itemList: Item[];
}
