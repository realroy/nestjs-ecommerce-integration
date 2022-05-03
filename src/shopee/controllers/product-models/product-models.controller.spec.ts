import { Test, TestingModule } from '@nestjs/testing';
import { ProductModelsController } from './product-models.controller';

describe('ProductModelsController', () => {
  let controller: ProductModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductModelsController],
    }).compile();

    controller = module.get<ProductModelsController>(ProductModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
