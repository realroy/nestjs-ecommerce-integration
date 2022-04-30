import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import {
  AuthorizedRequest,
  GetBrandsQueryDto,
  RegisterBrandBodyDto,
} from 'src/shopee/dto';
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

  @Post()
  create(@Req() req: AuthorizedRequest, @Body() body: RegisterBrandBodyDto) {
    return this.service.registerBrand({ shopId: req.shopId, ...body });
  }
}
