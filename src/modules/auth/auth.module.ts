import { jwtConstants } from '@/config/global.config';
import { AuthServices } from '@/config/services/auth';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { GetUserService } from './services/get-user.service';
import { HashPasswordService } from './services/hash-password.service';
import { LoginService } from './services/login.service';
import { PersistUser } from './services/persist-user.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { provide: AuthServices.HashPassword, useClass: HashPasswordService },
    { provide: AuthServices.Login, useClass: LoginService },
    { provide: AuthServices.GetUser, useClass: GetUserService },
    { provide: AuthServices.PersistUser, useClass: PersistUser },
  ],
})
export class AuthModule {}
