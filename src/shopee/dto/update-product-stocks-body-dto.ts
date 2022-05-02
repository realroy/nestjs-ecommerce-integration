import {
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class UpdateProductStocksBodyDto {
  @ValidateNested()
  @ArrayNotEmpty()
  stockList: ProductStockDto[];
}

class ProductStockDto {
  @IsOptional()
  @IsNumber()
  modelId?: number;

  @IsNumber()
  normalStock: number;
}
