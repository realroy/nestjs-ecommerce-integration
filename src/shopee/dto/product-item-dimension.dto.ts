import { IsNumber } from 'class-validator';

export class ProductItemDimension {
  @IsNumber()
  packageHeight: number;

  @IsNumber()
  packageLength: number;

  @IsNumber()
  packageWidth: number;
}
