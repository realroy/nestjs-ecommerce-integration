import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class ProductExtendedDescriptionField {
  @IsOptional()
  @IsString()
  fieldType: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @ValidateNested()
  imageInfo: {
    imageId: string;
  };
}
