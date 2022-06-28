import { User } from '@prisma/client';
import { IPersistUser } from '../interface/persist-user.interface';
import { PrismaService } from './../../../prisma/prisma.service';
export class PersistUser implements IPersistUser {
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
