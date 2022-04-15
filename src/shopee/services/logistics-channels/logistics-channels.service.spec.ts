import { Test, TestingModule } from '@nestjs/testing';
import { LogisticsChannelsService } from './logistics-channels.service';

describe('LogisticsChannelsService', () => {
  let service: LogisticsChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogisticsChannelsService],
    }).compile();

    service = module.get<LogisticsChannelsService>(LogisticsChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
