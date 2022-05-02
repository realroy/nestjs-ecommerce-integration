import {
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class UpdateProductPricesBodyDto {
  @ValidateNested()
  @ArrayNotEmpty()
  priceList: ProductPriceDto[];
}

class ProductPriceDto {
  @IsOptional()
  @IsNumber()
  modelId?: number;

  @IsNumber()
  originalPrice: number;
}
