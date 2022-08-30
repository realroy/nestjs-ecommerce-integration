import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { OrderTimeRangeFieldEnum, OrderStatusEnum } from '../enums';

export class GetOrderListQueryDto {
  @IsEnum(OrderTimeRangeFieldEnum)
  timeRangeField: OrderTimeRangeFieldEnum;

  @IsNumberString()
  timeFrom: number;

  @IsNumberString()
  timeTo: number;

  @IsNumberString()
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
