import { IsNumberString } from 'class-validator';

export class GetDaysToShipQueryDto {
  @IsNumberString()
  shopId: string;

  @IsNumberString()
  categoryId: string;
}
