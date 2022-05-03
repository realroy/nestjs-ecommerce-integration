import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  AddProductModelsBodyDto,
  AddProductModelsParamDto,
  AuthorizedRequest,
  DeleteProductModelsParamDto,
  UpdateProductModelsBodyDto,
  UpdateProductModelsParamDto,
} from 'src/shopee/dto';
import { ProductModelsService } from 'src/shopee/services';

@Controller('products/:productId/models')
export class ProductModelsController {
  constructor(private readonly service: ProductModelsService) {}

  @Get()
  async getList(
    @Req() req: AuthorizedRequest,
    @Param() param: AddProductModelsParamDto,
  ) {
    return this.service.getList({
      productId: param.productId,
      shopId: req.shopId,
    });
  }

  @Post()
  async create(
    @Req() req: AuthorizedRequest,
    @Param() param: AddProductModelsParamDto,
    @Body() body: AddProductModelsBodyDto,
  ) {
    return this.service.add({
      ...body,
      productId: param.productId,
      shopId: req.shopId,
    });
  }

  @Put()
  async update(
    @Req() req: AuthorizedRequest,
    @Param() params: UpdateProductModelsParamDto,
    @Body() body: UpdateProductModelsBodyDto,
  ) {
    return this.service.update({
      ...body,
      productId: params.productId,
      shopId: req.shopId,
    });
  }

  @Patch()
  async updatePartial(
    @Req() req: AuthorizedRequest,
    @Param() params: UpdateProductModelsParamDto,
    @Body() body: UpdateProductModelsBodyDto,
  ) {
    return this.service.update({
      ...body,
      productId: params.productId,
      shopId: req.shopId,
    });
  }

  @Delete(':id')
  async delete(
    @Req() req: AuthorizedRequest,
    @Param() params: DeleteProductModelsParamDto,
  ) {
    return this.service.remove({
      productId: params.productId,
      modelId: params.id,
      shopId: req.shopId,
    });
  }
}
