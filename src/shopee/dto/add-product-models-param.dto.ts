import { IsNumberString } from 'class-validator';

export class AddProductModelsParamDto {
  @IsNumberString()
  productId: string;
}
