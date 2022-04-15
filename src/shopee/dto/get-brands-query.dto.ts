import { IsNumberString, IsString, IsOptional } from 'class-validator';

import { GetBrandsStatusEnum } from '../enums';

export class GetBrandsQueryDto {
  @IsNumberString()
  shopId: string;

  @IsNumberString()
  pageSize: string;

  @IsNumberString()
  categoryId: number;

  @IsOptional()
  @IsNumberString()
  offset?: string | number;

  @IsOptional()
  @IsNumberString()
  status?: GetBrandsStatusEnum;

  @IsOptional()
  @IsString()
  language?: string;
}
