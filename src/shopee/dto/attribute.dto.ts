import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { AttributeValue } from './attribute-value.dto';

export class Attribute {
  @IsNumber()
  attributeId: number;

  @IsOptional()
  @ValidateNested()
  attributeValueList: AttributeValue[];
}
