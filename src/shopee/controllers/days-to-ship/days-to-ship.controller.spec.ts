import { Test, TestingModule } from '@nestjs/testing';
import { DaysToShipController } from './days-to-ship.controller';

describe('DaysToShipController', () => {
  let controller: DaysToShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaysToShipController],
    }).compile();

    controller = module.get<DaysToShipController>(DaysToShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
