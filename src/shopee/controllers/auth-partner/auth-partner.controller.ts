import { Controller, Get } from '@nestjs/common';

import { AuthPartnerService } from 'src/shopee/services';

@Controller('auth-partner')
export class AuthPartnerController {
  constructor(private readonly service: AuthPartnerService) {}

  @Get()
  async authPartner() {
    const url = this.service.getAuthPartnerUrl();

    return { url };
  }

  @Get('cancel')
  async cancelAuthPartner() {
    const url = this.service.getCancelAuthPartnerUrl();

    return { url };
  }
}
