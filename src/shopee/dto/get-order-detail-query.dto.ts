import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetOrderDetailQuery {
  @ArrayNotEmpty()
  @IsString({ each: true })
  orderSnList: string[];

  @IsOptional()
  @IsString({ each: true })
  responseOptionalFields?: string[];
}
