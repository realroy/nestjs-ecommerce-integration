import {
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProductComplaintPolicyWarrantyTimeEnum } from '../enums';

export class ProductComplaintPolicy {
  @IsOptional()
  @IsEnum(ProductComplaintPolicyWarrantyTimeEnum)
  warrantyTime: ProductComplaintPolicyWarrantyTimeEnum;

  @IsOptional()
  @IsBoolean()
  excludeEntrepreneurWarranty: boolean;

  @IsOptional()
  @IsNumber()
  complaintAddressId: number;

  @IsOptional()
  @IsString()
  @MaxLength(999)
  additionalInformation: string;
}
