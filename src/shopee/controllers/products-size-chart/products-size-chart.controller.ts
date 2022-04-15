import { Controller, Get, Query } from '@nestjs/common';
import { GetSupportSizeChartQueryDto } from 'src/shopee/dto';
import { ProductsSizeChartService } from 'src/shopee/services/products-size-chart/products-size-chart.service';

@Controller('products/size-chart')
export class ProductsSizeChartController {
  constructor(private readonly service: ProductsSizeChartService) {}

  @Get()
  getSupportSizeChart(@Query() query: GetSupportSizeChartQueryDto) {
    return this.service.getSupportSizeChart(query.shopId, query.categoryId);
  }
}
