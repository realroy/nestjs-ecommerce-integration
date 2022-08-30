import { Test, TestingModule } from '@nestjs/testing';

import { OrderBuyerCancellationController } from './order-buyer-cancellation.controller';

describe('OrderBuyerCancellationController', () => {
  let controller: OrderBuyerCancellationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBuyerCancellationController],
    }).compile();

    controller = module.get<OrderBuyerCancellationController>(OrderBuyerCancellationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
