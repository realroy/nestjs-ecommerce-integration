import {
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export class TierVariationDto {
  @IsString()
  name: string;

  @ValidateNested()
  @ArrayNotEmpty()
  optionList: TierVariationOptionDto[];
}

export class TierVariationOptionDto {
  @IsString()
  option: string;

  @IsOptional()
  @ValidateNested()
  image?: TierVariationOptionImageDto;
}

export class TierVariationOptionImageDto {
  image_id: string;
}
