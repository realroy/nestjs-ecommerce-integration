import { Controller, Get, Query, Req } from '@nestjs/common';
import { AuthorizedRequest, GetSupportSizeChartQueryDto } from 'src/shopee/dto';
import { ProductsSizeChartService } from 'src/shopee/services/products-size-chart/products-size-chart.service';

@Controller('products/size-chart')
export class ProductsSizeChartController {
  constructor(private readonly service: ProductsSizeChartService) {}

  @Get()
  getSupportSizeChart(
    @Req() req: AuthorizedRequest,
    @Query() query: GetSupportSizeChartQueryDto,
  ) {
    return this.service.getSupportSizeChart(req.shopId, query.categoryId);
  }
}
