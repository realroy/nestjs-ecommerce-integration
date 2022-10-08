import { IsOptional, IsString } from 'class-validator';

export class CallBackQueryDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  shop_id?: string | null;

  @IsOptional()
  @IsString()
  main_account_id?: string | null;

  @IsString()
  sign: string;
}
