import { Controller, Get, Req } from '@nestjs/common';
import { AuthorizedRequest } from 'src/shopee/dto';

import { CategoriesService } from 'src/shopee/services';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  getCategories(@Req() req: AuthorizedRequest) {
    return this.service.getCategories(req.shopId);
  }
}
