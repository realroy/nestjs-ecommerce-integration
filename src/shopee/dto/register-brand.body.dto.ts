import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class RegisterBrandProductImageDto {
  @IsArray()
  imageIdList: string[];
}

export class RegisterBrandBodyDto {
  @IsString()
  originalBrandName: string;

  @IsArray()
  @ArrayNotEmpty()
  categoryList: string[];

  @IsOptional()
  @ValidateNested()
  productImage: RegisterBrandProductImageDto;

  @IsOptional()
  @IsString()
  appLogoImageId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(254)
  brandWebsite?: string;

  @IsOptional()
  @IsString()
  @MaxLength(254)
  brandDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(254)
  additionalInformation?: string;

  @IsOptional()
  @IsString()
  pcLogoImageId?: string;

  @IsString()
  brandCountry: string;
}
