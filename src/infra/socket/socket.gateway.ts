import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  afterInit(server: any) {
    console.log('Method not implemented.');
  }

  // On User Connect
  async handleConnection(client: Socket) {
    const { uuid, username } = client.handshake.query as {
      [key: string]: string;
    };
    console.log(uuid);

    if (!uuid) {
      return;
    }

    await this.cacheManager.set(`socket:${uuid}`, {
      socketId: client.id,
      username,
      uuid,
    });
  }

  // On User Disconnect
  async handleDisconnect(client: Socket) {
    const uuid: string = await this.cacheManager.get(`socket:${client.id}`);

    if (!uuid) {
      return;
    }

    await this.cacheManager.del(`socket:${client.id}`);

    console.log(`Disconnected with:`, uuid);
  }
}
