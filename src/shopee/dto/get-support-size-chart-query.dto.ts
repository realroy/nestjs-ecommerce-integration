import { IsNumberString } from 'class-validator';

export class GetSupportSizeChartQueryDto {
  @IsNumberString()
  shopId: string;

  @IsNumberString()
  categoryId: string;
}
