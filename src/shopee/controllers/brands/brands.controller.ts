import { Controller, Get, Query, Req } from '@nestjs/common';
import { AuthorizedRequest, GetBrandsQueryDto } from 'src/shopee/dto';
import { BrandsService } from 'src/shopee/services';

@Controller('brands')
export class BrandsController {
  constructor(private readonly service: BrandsService) {}

  @Get()
  getBrands(@Req() req: AuthorizedRequest, @Query() query: GetBrandsQueryDto) {
    return this.service.getBrands(
      req.shopId,
      query.pageSize,
      query.categoryId,
      query.offset,
      query.status,
      query.language,
    );
  }
}
