import { Test, TestingModule } from '@nestjs/testing';
import { ProductModelsService } from './product-models.service';

describe('ProductModelsService', () => {
  let service: ProductModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductModelsService],
    }).compile();

    service = module.get<ProductModelsService>(ProductModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
