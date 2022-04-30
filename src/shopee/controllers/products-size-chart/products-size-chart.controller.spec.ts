import { Test, TestingModule } from '@nestjs/testing';
import { ProductsSizeChartController } from './products-size-chart.controller';

describe('ProductsSizeChartController', () => {
  let controller: ProductsSizeChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsSizeChartController],
    }).compile();

    controller = module.get<ProductsSizeChartController>(
      ProductsSizeChartController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
