import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AttributeValue {
  @IsNumber()
  valueId: number;

  @IsOptional()
  @IsString()
  originalValueName: string;

  @IsOptional()
  @IsString()
  valueUnit: string;
}
