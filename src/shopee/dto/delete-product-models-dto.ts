import { IsNumberString } from 'class-validator';

export class DeleteProductModelsDto {
  @IsNumberString()
  shopId: string;

  @IsNumberString()
  productId: string;

  @IsNumberString()
  modelId: string;
}
