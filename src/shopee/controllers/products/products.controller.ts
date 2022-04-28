import { Body, Controller, Delete, Patch, Post, Put } from '@nestjs/common';
import {
  AddItemsBodyDto,
  DeleteItemBodyDto,
  UpdateItemsBodyDto,
} from 'src/shopee/dto';
import { ProductsService } from 'src/shopee/services';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  async create(@Body() dto: AddItemsBodyDto) {
    const shopId = '45291';
    return this.service.addItem({ ...dto, shopId });
  }

  @Put()
  async update(@Body() dto: UpdateItemsBodyDto) {
    const shopId = '45291';
    return this.service.updateItem({ ...dto, shopId });
  }

  @Patch()
  async updatePartial(@Body() dto: UpdateItemsBodyDto) {
    const shopId = '45291';
    return this.service.updateItem({ ...dto, shopId });
  }

  @Delete()
  async delete(@Body() dto: DeleteItemBodyDto) {
    const shopId = '45291';
    return this.service.deleteItem({ ...dto, shopId });
  }
}
