import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderTimeRangeFieldEnum, OrderStatusEnum } from '../enums';

export class GetOrderListDto {
  @IsEnum(OrderTimeRangeFieldEnum)
  timeRangeField: OrderTimeRangeFieldEnum;

  @IsDate()
  timeFrom: Date;

  @IsDate()
  timeTo: Date;

  @IsNumber()
  pageSize: number;

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  orderStatus?: OrderStatusEnum;

  @IsOptional()
  responseOptionalFields?: string;
}
