import { Controller, Delete, Post, Req } from '@nestjs/common';
import { AuthorizedRequest } from 'src/shopee/dto';

import { AuthPartnerService } from 'src/shopee/services';

@Controller('auth-partner')
export class AuthPartnerController {
  constructor(private readonly service: AuthPartnerService) {}

  @Post()
  async authPartner(@Req() req: AuthorizedRequest) {
    const url = await this.service.getAuthPartnerUrl(req.shopId);

    return { url };
  }

  @Delete('cancel')
  async cancelAuthPartner(@Req() req: AuthorizedRequest) {
    const url = await this.service.getCancelAuthPartnerUrl(req.shopId);

    return { url };
  }
}
