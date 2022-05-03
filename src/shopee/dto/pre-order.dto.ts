import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PreOrderDto {
  @IsBoolean()
  isPreOrder: boolean;

  @IsOptional()
  @IsNumber()
  dayToShip: number;
}
