import { Controller, Get } from '@nestjs/common';
import { ShopsService } from '../../services';

@Controller('shops')
export class ShopsController {
  constructor(private readonly service: ShopsService) {}

  @Get()
  getMany() {
    return this.service.getMany();
  }
}
