import { Test, TestingModule } from '@nestjs/testing';
import { ProductTierVariationsController } from './product-tier-variations.controller';

describe('ProductTierVariationsController', () => {
  let controller: ProductTierVariationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTierVariationsController],
    }).compile();

    controller = module.get<ProductTierVariationsController>(ProductTierVariationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
