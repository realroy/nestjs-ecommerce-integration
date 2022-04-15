import { Controller, Get, Query } from '@nestjs/common';
import { GetBrandsQueryDto } from 'src/shopee/dto';
import { BrandsService } from 'src/shopee/services';

@Controller('brands')
export class BrandsController {
  constructor(private readonly service: BrandsService) {}

  @Get()
  getBrands(@Query() query: GetBrandsQueryDto) {
    return this.service.getBrands(
      query.shopId,
      query.pageSize,
      query.categoryId,
      query.offset,
      query.status,
      query.language,
    );
  }
}
