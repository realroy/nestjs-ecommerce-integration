import { IntersectionType } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

import { UpdateProductModelsBodyDto } from './update-product-models-body.dto';
import { UpdateProductModelsParamDto } from './update-product-models-param.dto';

export class UpdateProductModelsDto extends IntersectionType(
  UpdateProductModelsBodyDto,
  UpdateProductModelsParamDto,
) {
  @IsNumberString()
  shopId: string;
}
