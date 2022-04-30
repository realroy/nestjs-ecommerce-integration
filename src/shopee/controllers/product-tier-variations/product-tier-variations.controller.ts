import { Body, Controller, Patch, Post, Put, Req } from '@nestjs/common';
import {
  AuthorizedRequest,
  CreateTierVariationBodyDto,
  UpdateTierVariationBodyDto,
} from 'src/shopee/dto';
import { ProductTierVariationsService } from 'src/shopee/services';

@Controller('products/tier-variations')
export class ProductTierVariationsController {
  constructor(private readonly service: ProductTierVariationsService) {}
  @Post()
  create(
    @Req() req: AuthorizedRequest,
    @Body() body: CreateTierVariationBodyDto,
  ) {
    return this.service.initTierVariation({ ...body, shopId: req.shopId });
  }

  @Put()
  update(
    @Req() req: AuthorizedRequest,
    @Body() body: UpdateTierVariationBodyDto,
  ) {
    return this.service.updateTierVariation({ ...body, shopId: req.shopId });
  }

  @Patch()
  updatePartial(
    @Req() req: AuthorizedRequest,
    @Body() body: UpdateTierVariationBodyDto,
  ) {
    return this.service.updateTierVariation({ ...body, shopId: req.shopId });
  }
}
