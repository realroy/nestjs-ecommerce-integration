import { IsOptional, IsString, IsEnum } from 'class-validator';
import {
  ProductTaxInfoInvoiceOptionEnum,
  ProductTaxInfoVatRateEnum,
} from '../enums';

export class ProductTaxInfo {
  @IsOptional()
  @IsString()
  ncm: string;

  @IsOptional()
  @IsString()
  sameStateCfop: string;

  @IsOptional()
  @IsString()
  diffStateCfop: string;

  @IsOptional()
  @IsString()
  csosn: string;

  @IsOptional()
  @IsString()
  origin: string;

  @IsOptional()
  @IsString()
  cest: string;

  @IsOptional()
  @IsString()
  measureUnit: string;

  @IsOptional()
  @IsEnum(ProductTaxInfoInvoiceOptionEnum)
  invoiceOption: ProductTaxInfoInvoiceOptionEnum;

  @IsOptional()
  @IsEnum(ProductTaxInfoVatRateEnum)
  vatRate: ProductTaxInfoVatRateEnum;

  @IsOptional()
  @IsString()
  hsCode: string;

  @IsOptional()
  @IsString()
  taxCode: string;
}
