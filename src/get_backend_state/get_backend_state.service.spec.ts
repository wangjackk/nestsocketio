import { Test, TestingModule } from '@nestjs/testing';
import { GetBackendStateService } from './get_backend_state.service';

describe('GetBackendStateService', () => {
  let service: GetBackendStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBackendStateService],
    }).compile();

    service = module.get<GetBackendStateService>(GetBackendStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
