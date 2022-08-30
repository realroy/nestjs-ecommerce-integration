import { Test, TestingModule } from '@nestjs/testing';

import { OrderShipmentsController } from './order-shipments.controller';

describe('OrdersController', () => {
  let controller: OrderShipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderShipmentsController],
    }).compile();

    controller = module.get<OrderShipmentsController>(OrderShipmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
