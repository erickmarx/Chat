import { User } from '@prisma/client';

export interface IGetUserService {
  getWithPassword: (username: string) => Promise<User>;
  getWithoutPassword: (username: string) => Promise<Omit<User, 'password'>>;
}
