import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegisterBrandBodyDto } from 'src/shopee/dto';

import { GetBrandsStatusEnum } from 'src/shopee/enums';

import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class BrandsService extends TokensService {
  async registerBrand(dto: RegisterBrandBodyDto & { shopId: string }) {
    const path = '/api/v2/product/register_brand';
    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      original_brand_name: dto.originalBrandName,
      category_list: dto.categoryList.map((category) => +category),
      ...(dto.productImage
        ? { product_image: dto.productImage?.imageIdList ?? [] }
        : {}),
      ...(dto.appLogoImageId ? { app_logo_image_id: dto.appLogoImageId } : {}),
      ...(dto.brandWebsite ? { brand_website: dto.brandWebsite } : {}),
      ...(dto.brandDescription
        ? { brand_description: dto.brandDescription }
        : {}),
      ...(dto.additionalInformation
        ? { additional_information: dto.additionalInformation }
        : {}),
      ...(dto.pcLogoImageId ? { pc_logo_image_id: dto.pcLogoImageId } : {}),
      brand_country: dto.brandCountry,
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }
  async getBrands(
    shopId: number | string,
    pageSize: number | string,
    categoryId: number,
    offset: number | string = 0,
    status = GetBrandsStatusEnum.Normal,
    language?: string,
  ) {
    const path = '/api/v2/product/get_brand_list';
    const url = await this.createSignedUrlWithAccessToken(
      path,
      shopId.toString(),
      {
        shop_id: shopId.toString(),
        offset,
        page_size: pageSize,
        category_id: categoryId,
        status,
      },
    );

    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }
}
