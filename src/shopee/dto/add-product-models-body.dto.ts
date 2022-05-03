import {
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class AddProductModelsBodyDto {
  @ValidateNested()
  @ArrayNotEmpty()
  modelList: ModelListDto[];
}

class ModelListDto {
  @ArrayNotEmpty()
  tierIndex: any[];

  @IsNumber()
  normalStock: number;

  @IsNumber()
  originalPrice: number;

  @IsOptional()
  @IsNumber()
  modelSku?: number;
}
