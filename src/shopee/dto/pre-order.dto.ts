import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PreOrder {
  @IsBoolean()
  isPreOrder: boolean;

  @IsOptional()
  @IsNumber()
  dayToShip: number;
}
