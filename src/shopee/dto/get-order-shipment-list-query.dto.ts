import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetOrderShipmentListQuery {
  @IsNumberString()
  pageSize: string;

  @IsOptional()
  @IsString()
  cursor?: string;
}
