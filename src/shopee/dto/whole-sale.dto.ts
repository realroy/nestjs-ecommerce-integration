import { IsNumber } from 'class-validator';

export class Wholesale {
  @IsNumber()
  minCount: number;

  @IsNumber()
  maxCount: number;

  @IsNumber()
  unitPrice: number;
}
