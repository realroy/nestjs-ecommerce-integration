import { Test, TestingModule } from '@nestjs/testing';
import { DaysToShipService } from './days-to-ship.service';

describe('DaysToShipService', () => {
  let service: DaysToShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaysToShipService],
    }).compile();

    service = module.get<DaysToShipService>(DaysToShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
