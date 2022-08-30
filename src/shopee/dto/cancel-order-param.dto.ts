import { IsString } from 'class-validator';

export class CancelOrderParam {
  @IsString()
  orderSn: string;
}
