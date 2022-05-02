import { IsNumberString } from 'class-validator';

export class UpdateProductPricesParamsDto {
  @IsNumberString()
  id: string;
}
