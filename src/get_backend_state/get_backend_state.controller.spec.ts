import { Test, TestingModule } from '@nestjs/testing';
import { GetBackendStateController } from './get_backend_state.controller';
import { GetBackendStateService } from './get_backend_state.service';

describe('GetBackendStateController', () => {
  let controller: GetBackendStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetBackendStateController],
      providers: [GetBackendStateService],
    }).compile();

    controller = module.get<GetBackendStateController>(GetBackendStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
