import { Controller, Get, Query, Req } from '@nestjs/common';
import { AuthorizedRequest } from 'src/shopee/dto';
import { GetAttributesQueryDto } from 'src/shopee/dto/get-attributes-query.dto';
import { AttributesService, TokensService } from 'src/shopee/services';

@Controller('attributes')
export class AttributesController {
  constructor(
    private readonly attributeService: AttributesService,
    private readonly tokenService: TokensService,
  ) {}

  @Get()
  async findMany(
    @Req() req: AuthorizedRequest,
    @Query() query: GetAttributesQueryDto,
  ) {
    const { shopId } = req;

    const accessToken = await this.tokenService.getAccessToken(shopId);

    const result = await this.attributeService.getAttributes(
      shopId,
      query.categoryId,
      accessToken,
    );

    return result;
  }
}
