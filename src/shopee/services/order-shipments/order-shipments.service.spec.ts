import { Test, TestingModule } from '@nestjs/testing';
import { OrderShipmentsService } from './orders-shipment.service';

describe('OrderShipmentsService', () => {
  let service: OrderShipmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderShipmentsService],
    }).compile();

    service = module.get<OrderShipmentsService>(OrderShipmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
