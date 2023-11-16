import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Redis from 'ioredis';

class PC {
  id: number;
  name: string;
  usage: number;
  work: string;

  constructor(id: number, name: string, usage: number, work: string) {
    this.id = id;
    this.name = name;
    this.usage = usage;
    this.work = work;
  }
}

const KEY: string = 'pcsUsage';

@Injectable()
export class ReadFromRedis {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      // Redis配置
    });
  }

  async getPC(pcId: number): Promise<PC | null> {
    const pcData = await this.redisClient.hgetall(`pc:${pcId}`);

    if (Object.keys(pcData).length === 0) {
      // 没有找到PC数据
      return null;
    }

    // 将哈希数据转换为PC对象
    return new PC(pcId, pcData.name, parseFloat(pcData.usage), pcData.work);
  }

  async getAllPCIds(): Promise<string[]> {
    // 获取整个有序集合
    return this.redisClient.zrange(KEY, 0, -1);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async printAllPCs() {
    const ids = await this.getAllPCIds();
    for (const id of ids) {
      const pc = await this.getPC(parseInt(id.split(':')[1]));
      console.log(pc);
    }
  }
}
