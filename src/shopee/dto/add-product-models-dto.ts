import { IntersectionType } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

import { AddProductModelsBodyDto } from './add-product-models-body.dto';
import { AddProductModelsParamDto } from './add-product-models-param.dto';

export class AddProductModelsDto extends IntersectionType(
  AddProductModelsBodyDto,
  AddProductModelsParamDto,
) {
  @IsNumberString()
  shopId: string;
}
