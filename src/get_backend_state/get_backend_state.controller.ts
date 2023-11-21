import { Controller, Get, Param } from '@nestjs/common';
import { GetBackendStateService } from './get_backend_state.service' // 导入您的服务

@Controller('pcs')
export class GetBackendStateController {
  constructor(private readonly readFromRedisService: GetBackendStateService) {
    console.log('初始化完成')
  }

  @Get(':id')
  async getPC(@Param('id') id: string) {
    const pc = await this.readFromRedisService.getPC(parseInt(id));
    if (!pc) {
      return { message: 'PC not found' };
    }
    return pc;
  }

  @Get()
  async getAllPCs() {
    const ids = await this.readFromRedisService.getAllPCIds();
    const pcs = [];
    for (const id of ids) {
      const pc = await this.readFromRedisService.getPC(parseInt(id.split(':')[1]));
      if (pc) {
        pcs.push(pc);
      }
    }
    return pcs;
  }
}
