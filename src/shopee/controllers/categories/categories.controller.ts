import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from 'src/shopee/services';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  getCategories(@Query('shopId') shopId: string) {
    return this.service.getCategories(shopId);
  }
}
