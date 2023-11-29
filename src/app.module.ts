import { Module } from '@nestjs/common';
import { SocketModule } from './infra/socket/socket.module';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { UserModule } from './modules/user/user.module';
import { MongoModule } from './infra/database/mongoose/mongoose.module';
import { AppController } from './app.controller';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      url: process.env.REDIS_URL,
    });
    return {
      store: () => store,
      ttl: 86400000, // 1 day (remove this if you dont want to clear cache automatically)
    };
  },
};

@Module({
  imports: [
    MongoModule,
    SocketModule,
    CacheModule.registerAsync(RedisOptions),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
