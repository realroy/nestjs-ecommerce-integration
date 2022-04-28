import { IsOptional, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { ProductExtendedDescriptionField } from './product-extended-description-field.dto';

export class ProductExtendedDescription {
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested()
  fieldList: ProductExtendedDescriptionField[];
}
