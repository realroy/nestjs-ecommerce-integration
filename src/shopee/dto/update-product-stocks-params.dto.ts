import { IsNumberString } from 'class-validator';

export class UpdateProductStocksParamsDto {
  @IsNumberString()
  id: string;
}
