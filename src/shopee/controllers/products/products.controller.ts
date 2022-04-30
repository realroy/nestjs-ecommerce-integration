import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  AddItemsBodyDto,
  AuthorizedRequest,
  DeleteItemBodyDto,
  UpdateItemsBodyDto,
} from 'src/shopee/dto';
import { ProductsService } from 'src/shopee/services';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  async create(@Req() req: AuthorizedRequest, @Body() dto: AddItemsBodyDto) {
    return this.service.addItem({ ...dto, shopId: req.shopId });
  }

  @Put()
  async update(@Req() req: AuthorizedRequest, @Body() dto: UpdateItemsBodyDto) {
    return this.service.updateItem({ ...dto, shopId: req.shopId });
  }

  @Patch()
  async updatePartial(
    @Req() req: AuthorizedRequest,
    @Body() dto: UpdateItemsBodyDto,
  ) {
    return this.service.updateItem({ ...dto, shopId: req.shopId });
  }

  @Delete()
  async delete(@Req() req: AuthorizedRequest, @Body() dto: DeleteItemBodyDto) {
    return this.service.deleteItem({ ...dto, shopId: req.shopId });
  }
}
