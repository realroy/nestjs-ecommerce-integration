import { Test, TestingModule } from '@nestjs/testing';
import { ProductTierVariationsService } from './product-tier-variations.service';

describe('ProductTierVariationsService', () => {
  let service: ProductTierVariationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductTierVariationsService],
    }).compile();

    service = module.get<ProductTierVariationsService>(
      ProductTierVariationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
