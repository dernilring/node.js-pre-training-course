import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
 imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 300000,
        }),
      }),
    }),
    TodoModule,
  ],
})
export class AppModule {} 