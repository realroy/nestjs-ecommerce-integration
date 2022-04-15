import { Test, TestingModule } from '@nestjs/testing';
import { ProductsSizeChartService } from './products-size-chart.service';

describe('ProductsSizeChartService', () => {
  let service: ProductsSizeChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsSizeChartService],
    }).compile();

    service = module.get<ProductsSizeChartService>(ProductsSizeChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
