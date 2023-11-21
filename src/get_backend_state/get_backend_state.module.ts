import { Module } from '@nestjs/common';
import { GetBackendStateService } from './get_backend_state.service';
import { GetBackendStateController } from './get_backend_state.controller';

@Module({
  controllers: [GetBackendStateController],
  providers: [GetBackendStateService],
})
export class GetBackendStateModule {}
