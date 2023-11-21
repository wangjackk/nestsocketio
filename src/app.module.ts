import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { ReadFromRedisModule } from './read-from-redis/read-from-redis.module';
import { GetBackendStateModule } from './get_backend_state/get_backend_state.module';

@Module({
  imports: [GatewayModule, GetBackendStateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
