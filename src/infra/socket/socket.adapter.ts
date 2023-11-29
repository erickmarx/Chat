import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Cache } from 'cache-manager';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketAdapter {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  sendMessageToAll(event: string, data: any) {
    this.server.emit(event, data.message);
  }

  async sendMessageSpecificUser(event: string, data: any) {
    const receiverSocketId = await this.cacheManager.get<string>(
      `userId:${data.userId}`,
    );

    this.server.to(receiverSocketId).emit(event, data.message);
  }
}
