import {
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ProductModelDto {
  @IsArray()
  @ArrayNotEmpty()
  tierIndex: number[];

  @IsNumber()
  normalStock: number;

  @IsNumber()
  originalPrice: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  modelSku: string;
}
