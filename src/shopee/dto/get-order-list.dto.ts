import { IsNumberString } from 'class-validator';
import { GetOrderListQueryDto } from './get-order-list-query.dto';

export class GetOrderListDto extends GetOrderListQueryDto {
  @IsNumberString()
  shopId: string;
}
