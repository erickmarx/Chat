import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IGetUserService } from '../interface/get-user.service.interface';

@Injectable()
export class GetUserService implements IGetUserService {
  constructor(private prismaService: PrismaService) {}
  async getWithPassword(username: string): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { username },
    });
  }

  async getWithoutPassword(username: string): Promise<Omit<User, 'password'>> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { username },
      select: { id: true, username: true },
    });
  }
}
