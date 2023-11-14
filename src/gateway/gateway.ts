import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class MyGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  onMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'new message',
      content: body,
    });
  }

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }
}
