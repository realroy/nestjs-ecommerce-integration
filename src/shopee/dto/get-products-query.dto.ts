import {
  ArrayNotEmpty,
  IsDate,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';

enum GetProductsQueryItemStatus {
  Normal = 'NORMAL',
  Banned = 'BANNED',
  Deleted = 'DELETED',
  Unlist = 'UNLIST',
}

export class GetProductsQueryDto {
  @IsNumberString()
  offset: number;

  @IsNumberString()
  pageSize: number;

  @IsOptional()
  @IsDate()
  updateTimeFrom: string;

  @IsOptional()
  @IsDate()
  updateTimeTo: string;

  @IsEnum(GetProductsQueryItemStatus)
  @ArrayNotEmpty()
  itemStatus: GetProductsQueryItemStatus[];
}
