import { IsNumberString } from 'class-validator';

export class GetAttributesQueryDto {
  @IsNumberString()
  shopId: string;

  @IsNumberString()
  categoryId: string;
}
