import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class GetOrderShipmentList {
  @IsNumberString()
  shopId: string;

  @IsNumber()
  pageSize: number;

  @IsOptional()
  cursor?: string;
}
