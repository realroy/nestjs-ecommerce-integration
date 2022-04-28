import { Body, Controller, Post } from '@nestjs/common';
import { AddItemsBodyDto } from 'src/shopee/dto';
import { ProductsService } from 'src/shopee/services';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  async create(@Body() dto: AddItemsBodyDto) {
    const shopId = '45291';
    return this.service.addItem(shopId, dto);
  }
}
