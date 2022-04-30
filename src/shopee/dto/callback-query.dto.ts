import { IsOptional, IsString } from 'class-validator';

export class CallBackQueryDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  shopId: string;

  @IsOptional()
  @IsString()
  mainAccountId: string;
}
