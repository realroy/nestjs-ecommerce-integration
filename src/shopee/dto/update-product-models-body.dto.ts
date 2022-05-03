import {
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PreOrderDto } from './pre-order.dto';

export class UpdateProductModelsBodyDto {
  @ValidateNested()
  @ArrayNotEmpty()
  model: ModelDto[];
}

class ModelDto {
  @IsNumber()
  modelId: number;

  @IsString()
  modelSku: string;

  @IsOptional()
  @ValidateNested()
  preOrder?: PreOrderDto;
}
