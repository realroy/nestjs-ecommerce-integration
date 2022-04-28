import { IsOptional, ValidateNested } from 'class-validator';

import { ProductExtendedDescription } from './product-extended-description.dto';

export class ProductDescriptionInfo {
  @IsOptional()
  @ValidateNested()
  extendedDescription: ProductExtendedDescription;
}
