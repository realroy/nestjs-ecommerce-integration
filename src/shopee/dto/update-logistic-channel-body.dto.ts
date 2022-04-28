import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateLogisticChannelBodyDto {
  @IsNumber()
  logisticsChannelId: number;

  @IsOptional()
  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsBoolean()
  preferred: boolean;

  @IsOptional()
  @IsBoolean()
  codEnabled: boolean;
}
