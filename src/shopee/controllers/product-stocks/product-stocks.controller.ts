import { Body, Controller, Param, Patch, Put, Req } from '@nestjs/common';
import {
  AuthorizedRequest,
  UpdateProductStocksBodyDto,
  UpdateProductStocksParamsDto,
} from 'src/shopee/dto';
import { ProductStocksService } from 'src/shopee/services';

@Controller('products/stocks')
export class ProductStocksController {
  constructor(private readonly service: ProductStocksService) {}

  @Put(':id')
  async update(
    @Req() req: AuthorizedRequest,
    @Param() params: UpdateProductStocksParamsDto,
    @Body() body: UpdateProductStocksBodyDto,
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
    @Param() params: UpdateProductStocksParamsDto,
    @Body() body: UpdateProductStocksBodyDto,
  ) {
    return this.service.updateStock({
      ...body,
      id: params.id,
      shopId: req.shopId,
    });
  }
}
