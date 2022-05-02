import { Test, TestingModule } from '@nestjs/testing';
import { ProductStocksController } from './product-stocks.controller';

describe('ProductStocksController', () => {
  let controller: ProductStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductStocksController],
    }).compile();

    controller = module.get<ProductStocksController>(ProductStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
