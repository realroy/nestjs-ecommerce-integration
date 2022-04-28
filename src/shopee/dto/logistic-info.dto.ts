import { IsNumber, IsBoolean } from 'class-validator';

export class LogisticInfo {
  @IsNumber()
  sizeId: number;

  @IsNumber()
  shippingFee: number;

  @IsBoolean()
  enabled: boolean;

  @IsNumber()
  logisticId: string;

  @IsBoolean()
  isFree: boolean;
}
