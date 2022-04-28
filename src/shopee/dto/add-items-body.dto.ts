import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
  ArrayNotEmpty,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { ProductItemStatus, ProductConditionEnum } from '../enums';
import { Attribute } from './attribute.dto';
import { Image } from './image.dto';
import { LogisticInfo } from './logistic-info.dto';
import { PreOrder } from './pre-order.dto';
import { ProductBrand } from './product-brand.dto';
import { ProductComplaintPolicy } from './product-complaint-policy.dto';
import { ProductDescriptionInfo } from './product-description-info.dto';
import { ProductItemDimension } from './product-item-dimension.dto';
import { ProductTaxInfo } from './product-tax-info.dto';
import { Wholesale } from './whole-sale.dto';

export class AddItemsBodyDto {
  @IsInt()
  originalPrice: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsOptional()
  @IsEnum(ProductItemStatus)
  itemStatus?: ProductItemStatus;

  @IsOptional()
  @ValidateNested()
  dimension?: ProductItemDimension;

  @IsNumber()
  normalStock: number;

  @ArrayNotEmpty()
  @ValidateNested()
  logisticInfo: LogisticInfo[];

  @IsOptional()
  @ValidateNested()
  attributeList?: Attribute[];

  @IsNumber()
  categoryId: number;

  @ValidateNested()
  image: Image;

  @IsOptional()
  @ValidateNested()
  preOrder?: PreOrder;

  @IsOptional()
  @IsString()
  itemSku?: string;

  @IsOptional()
  @IsEnum(ProductConditionEnum)
  condition?: ProductConditionEnum;

  @IsOptional()
  @ValidateNested()
  wholesale?: Wholesale[];

  @IsOptional()
  videoUploadId: string[];

  @IsOptional()
  @ValidateNested()
  brand?: ProductBrand;

  @IsOptional()
  @IsBoolean()
  itemDangerous?: boolean;

  @IsOptional()
  @ValidateNested()
  taxInfo?: ProductTaxInfo;

  @IsOptional()
  @ValidateNested()
  complaintPolicy?: ProductComplaintPolicy;

  @IsOptional()
  @ValidateNested()
  descriptionInfo?: ProductDescriptionInfo;

  @IsOptional()
  @IsString()
  descriptionType?: string;
}
