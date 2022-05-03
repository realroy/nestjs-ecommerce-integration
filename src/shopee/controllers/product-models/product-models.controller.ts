import {
  Body,
  Controller,
  Delete,
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
} from 'src/shopee/dto';
import { ProductModelsService } from 'src/shopee/services';

@Controller('products/:id/models')
export class ProductModelsController {
  constructor(private readonly service: ProductModelsService) {}

  @Post()
  async create(
    @Req() req: AuthorizedRequest,
    @Param() param: AddProductModelsParamDto,
    @Body() body: AddProductModelsBodyDto,
  ) {
    return this.service.add({
      ...body,
      id: param.id,
      shopId: req.shopId,
    });
  }

  @Put()
  async update(
    @Req() req: AuthorizedRequest,
    @Param() params: AddProductModelsParamDto,
    @Body() body: AddProductModelsBodyDto,
  ) {
    return this.service.update({
      ...body,
      id: params.id,
      shopId: req.shopId,
    });
  }

  @Patch()
  async updatePartial(
    @Req() req: AuthorizedRequest,
    @Param() params: AddProductModelsParamDto,
    @Body() body: AddProductModelsBodyDto,
  ) {
    return this.service.update({
      ...body,
      id: params.id,
      shopId: req.shopId,
    });
  }

  @Delete()
  async delete(
    @Req() req: AuthorizedRequest,
    @Param() params: AddProductModelsParamDto,
  ) {
    return this.service.remove({
      id: params.id,
      shopId: req.shopId,
    });
  }
}
