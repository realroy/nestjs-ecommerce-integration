import { IsString } from 'class-validator';

export class CreateBuyerCancellationParam {
  @IsString()
  orderSn: string;
}
