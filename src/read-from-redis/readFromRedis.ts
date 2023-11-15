import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Redis from 'ioredis';

const KEY: string = 'key';
@Injectable()
export class ReadFromRedis {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      // Redis配置
    });
  }

  @Cron(CronExpression.EVERY_SECOND)
  async handleCron() {
    try {
      const value = await this.redisClient.get(KEY);
      console.log(`Value from Redis: ${value}`);
    } catch (error) {
      console.error('Error fetching from Redis:', error);
    }
  }
}
