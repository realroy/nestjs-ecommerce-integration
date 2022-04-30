import { IsNumberString } from 'class-validator';

export class GetAttributesQueryDto {
  @IsNumberString()
  categoryId: string;
}
