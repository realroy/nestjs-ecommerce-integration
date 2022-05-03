import { IsNumberString } from 'class-validator';

export class GetProductModelsDto {
  @IsNumberString()
  productId: string;

  @IsNumberString()
  shopId: string;
}
