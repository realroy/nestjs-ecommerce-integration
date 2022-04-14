import { Test, TestingModule } from '@nestjs/testing';
import { AuthPartnerController } from './auth-partner.controller';

describe('AuthPartnerController', () => {
  let controller: AuthPartnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthPartnerController],
    }).compile();

    controller = module.get<AuthPartnerController>(AuthPartnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
