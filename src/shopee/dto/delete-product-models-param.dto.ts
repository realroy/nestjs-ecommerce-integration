import { IsNumberString } from 'class-validator';

export class DeleteProductModelsParamDto {
  @IsNumberString()
  productId: string;

  @IsNumberString()
  id: string;
}
