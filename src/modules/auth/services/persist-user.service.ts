import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IPersistUserService } from '../interface/persist-user.interface';
import { PrismaService } from './../../../prisma/prisma.service';

@Injectable()
export class PersistUserService implements IPersistUserService {
  constructor(private prismaService: PrismaService) {}
  async persist(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    return await this.prismaService.user.create({
      data: { username, password },
      select: { username: true, id: true },
    });
  }
}
