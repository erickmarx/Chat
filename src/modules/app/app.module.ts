import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
