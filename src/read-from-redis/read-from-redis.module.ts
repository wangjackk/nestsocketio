import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReadFromRedis } from './readFromRedis';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ReadFromRedis],
})
export class ReadFromRedisModule {}
