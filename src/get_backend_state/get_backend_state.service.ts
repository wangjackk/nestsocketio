import { Injectable } from '@nestjs/common';
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
export class GetBackendStateService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      // Redis配置
    });
  }

  // 获取单个PC的信息
  async getPC(pcId: number): Promise<PC | null> {
    try {
      const pcData = await this.redisClient.hgetall(`pc:${pcId}`);

      if (Object.keys(pcData).length === 0) {
        // 没有找到PC数据
        return null;
      }

      // 将哈希数据转换为PC对象
      return new PC(pcId, pcData.name, parseFloat(pcData.usage), pcData.work);
    } catch (error) {
      // 错误处理
      console.error('Error fetching PC data from Redis:', error);
      throw new Error('Error fetching data');
    }
  }

  // 获取所有PC的ID列表
  async getAllPCIds(): Promise<string[]> {
    try {
      // 获取整个有序集合
      return this.redisClient.zrange(KEY, 0, -1);
    } catch (error) {
      // 错误处理
      console.error('Error fetching PC IDs from Redis:', error);
      throw new Error('Error fetching IDs');
    }
  }
}
