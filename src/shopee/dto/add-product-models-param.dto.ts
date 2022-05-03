import { IsNumberString } from 'class-validator';

export class AddProductModelsParamDto {
  @IsNumberString()
  id: string;
}
