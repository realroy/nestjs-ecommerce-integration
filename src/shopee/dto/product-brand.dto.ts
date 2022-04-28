import { IsNumber, IsString } from 'class-validator';

export class ProductBrand {
  @IsNumber()
  brandId: number;

  @IsString()
  originalBrandName: string;
}
