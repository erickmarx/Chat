import { User } from '@prisma/client';

export interface IPersistUser {
  persist: (
    username: string,
    password: string,
  ) => Promise<Omit<User, 'password'>>;
}
