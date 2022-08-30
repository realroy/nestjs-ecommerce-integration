import { Test, TestingModule } from '@nestjs/testing';
import { BuyerCancellationService } from './buyer-cancellation.service';

describe('BuyerCancellationService', () => {
  let service: BuyerCancellationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerCancellationService],
    }).compile();

    service = module.get<BuyerCancellationService>(BuyerCancellationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
