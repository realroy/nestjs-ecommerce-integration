import { OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { AddItemsBodyDto } from './add-items-body.dto';

export class UpdateItemsBodyDto extends OmitType(AddItemsBodyDto, [
  'originalPrice',
  'normalStock',
] as const) {
  @IsNumber()
  itemId: number;
}
