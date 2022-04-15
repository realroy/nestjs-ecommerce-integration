import { Test, TestingModule } from '@nestjs/testing';
import { LogisticsChannelsController } from './logistics-channels.controller';

describe('LogisticChannelsController', () => {
  let controller: LogisticsChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticsChannelsController],
    }).compile();

    controller = module.get<LogisticsChannelsController>(
      LogisticsChannelsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
