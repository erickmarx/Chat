import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
