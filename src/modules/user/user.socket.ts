import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketAdapter } from 'src/infra/socket/socket.adapter';

export class UserController extends SocketAdapter {
  @SubscribeMessage('events')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Handle received message
    this.server.emit('events', { message: 'Hello World!' });
  }
}
