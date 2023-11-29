import { Module } from '@nestjs/common';
import { UserController } from './user.socket';

@Module({ providers: [UserController], exports: [UserController] })
export class UserModule {}
