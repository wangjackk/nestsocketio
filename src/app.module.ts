import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { ReadFromRedisModule } from './read-from-redis/read-from-redis.module';

@Module({
  imports: [GatewayModule, ReadFromRedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
