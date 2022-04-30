import { IsNumberString } from 'class-validator';

export class GetDaysToShipQueryDto {
  @IsNumberString()
  categoryId: string;
}
