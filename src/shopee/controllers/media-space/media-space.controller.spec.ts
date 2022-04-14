import { Test, TestingModule } from '@nestjs/testing';
import { MediaSpaceController } from './media-space.controller';

describe('MediaSpaceController', () => {
  let controller: MediaSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaSpaceController],
    }).compile();

    controller = module.get<MediaSpaceController>(MediaSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
