import {Redis} from "ioredis";

const redis = new Redis();
const KEY: string = 'pcsUsage';
class PC
{
    id: number;
    name: string;
    usage: number;
    constructor(id:number, name:string, usage:number)
    {
        this.id = id;
        this.name = name;
        this.usage = usage;
    }

}

async function updatePC(pc: PC) {
    // 使用HSET存储PC的详细信息
    await redis.hset(`pc:${pc.id}`, 'name', pc.name, 'usage', pc.usage);

    // 使用ZADD更新PC的使用情况
    await redis.zadd(KEY, pc.usage, `pc:${pc.id}`);
}
async function getPC(pcId: number): Promise<PC | null> {
    const pcData = await redis.hgetall(`pc:${pcId}`);

    if (Object.keys(pcData).length === 0) {
        // 没有找到PC数据
        return null;
    }

    // 将哈希数据转换为PC对象
    return new PC(pcId, pcData.name, parseFloat(pcData.usage));
}
async function setPC(){
    //随机生成0-100的usage
    const usage = Math.floor(Math.random() * 100);
    const pc = new PC(0, '1', usage);
    await updatePC(pc).then(() => {
        console.log(`PC ${pc.id} updated, usage: ${pc.usage}`);
    });
}

async function setPC2(){
    //随机生成0-100的usage
    const usage = Math.floor(Math.random() * 100);
    const pc = new PC(1, '2', usage);
    await updatePC(pc).then(() => {
        console.log(`PC ${pc.id} updated, usage: ${pc.usage}`);
    });
}

setInterval(setPC, 1000);
setInterval(setPC2, 1000);