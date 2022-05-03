import { IsNumberString } from 'class-validator';

export class UpdateProductModelsParamDto {
  @IsNumberString()
  productId: string;
}
