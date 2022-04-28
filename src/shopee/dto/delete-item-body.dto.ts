import { IsNumber } from 'class-validator';

export class DeleteItemBodyDto {
  @IsNumber()
  itemId: number;
}
