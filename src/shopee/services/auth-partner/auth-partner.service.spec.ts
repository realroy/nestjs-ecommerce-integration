import { Test, TestingModule } from '@nestjs/testing';
import { AuthPartnerService } from './auth-partner.service';

describe('AuthPartnerService', () => {
  let service: AuthPartnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthPartnerService],
    }).compile();

    service = module.get<AuthPartnerService>(AuthPartnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
