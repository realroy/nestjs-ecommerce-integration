import { ArrayNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ProductModelDto } from './product-model.dto';

import { TierVariationDto } from './tier-variation.dto';

export class CreateTierVariationBodyDto {
  @IsNumber()
  itemId: number;

  @ValidateNested()
  @ArrayNotEmpty()
  tierVariation: TierVariationDto[];

  @ValidateNested()
  @ArrayNotEmpty()
  model: ProductModelDto[];
}
