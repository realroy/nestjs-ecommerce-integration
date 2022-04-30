import { Controller, Get, Query, Req } from '@nestjs/common';
import { GetAttributesQueryDto } from 'src/shopee/dto/get-attributes-query.dto';
import { AttributesService } from 'src/shopee/services';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly service: AttributesService) {}

  @Get()
  getAttributes(@Req() req, @Query() query: GetAttributesQueryDto) {
    return this.service.getAttributes(req.shopId, query.categoryId);
  }
}
