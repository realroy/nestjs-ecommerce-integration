import { Controller, Get, Query, Req } from '@nestjs/common';
import { GetSupportSizeChartQueryDto } from 'src/shopee/dto';
import { ProductsSizeChartService } from 'src/shopee/services/products-size-chart/products-size-chart.service';

@Controller('products/size-chart')
export class ProductsSizeChartController {
  constructor(private readonly service: ProductsSizeChartService) {}

  @Get()
  getSupportSizeChart(@Req() req, @Query() query: GetSupportSizeChartQueryDto) {
    return this.service.getSupportSizeChart(req.shopId, query.categoryId);
  }
}
