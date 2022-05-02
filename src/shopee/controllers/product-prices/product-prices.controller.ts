import { Body, Controller, Param, Patch, Put, Req } from '@nestjs/common';
import {
  AuthorizedRequest,
  UpdateProductPricesParamsDto,
  UpdateProductPricesBodyDto,
} from 'src/shopee/dto';
import { ProductPricesService } from 'src/shopee/services';

@Controller('products/prices')
export class ProductPricesController {
  constructor(private readonly service: ProductPricesService) {}

  @Put(':id')
  async update(
    @Req() req: AuthorizedRequest,
    @Param() params: UpdateProductPricesParamsDto,
    @Body() body: UpdateProductPricesBodyDto,
  ) {
    return this.service.updateStock({
      ...body,
      id: params.id,
      shopId: req.shopId,
    });
  }

  @Patch(':id')
  async updatePartial(
    @Req() req: AuthorizedRequest,
    @Param() params: UpdateProductPricesParamsDto,
    @Body() body: UpdateProductPricesBodyDto,
  ) {
    return this.service.updateStock({
      ...body,
      id: params.id,
      shopId: req.shopId,
    });
  }
}
