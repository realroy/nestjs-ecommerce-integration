import { IsNumberString } from 'class-validator';

export class GetProductModelsParamDto {
  @IsNumberString()
  productId: string;
}
