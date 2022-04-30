import { Controller, Get, Req } from '@nestjs/common';

import { CategoriesService } from 'src/shopee/services';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  getCategories(@Req() req) {
    return this.service.getCategories(req.shopId);
  }
}
