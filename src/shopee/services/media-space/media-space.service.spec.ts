import { Test, TestingModule } from '@nestjs/testing';
import { MediaSpaceService } from './media-space.service';

describe('MediaSpaceService', () => {
  let service: MediaSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaSpaceService],
    }).compile();

    service = module.get<MediaSpaceService>(MediaSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
