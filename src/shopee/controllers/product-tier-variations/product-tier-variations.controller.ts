import { Body, Controller, Patch, Post, Put, Req } from '@nestjs/common';
import {
  CreateTierVariationBodyDto,
  UpdateTierVariationBodyDto,
} from 'src/shopee/dto';
import { ProductTierVariationsService } from 'src/shopee/services';

@Controller('products/tier-variations')
export class ProductTierVariationsController {
  constructor(private readonly service: ProductTierVariationsService) {}
  @Post()
  create(@Req() req, @Body() body: CreateTierVariationBodyDto) {
    return this.service.initTierVariation({ ...body, shopId: req.shopId });
  }

  @Put()
  update(@Req() req, @Body() body: UpdateTierVariationBodyDto) {
    return this.service.updateTierVariation({ ...body, shopId: req.shopId });
  }

  @Patch()
  updatePartial(@Req() req, @Body() body: UpdateTierVariationBodyDto) {
    return this.service.updateTierVariation({ ...body, shopId: req.shopId });
  }
}
