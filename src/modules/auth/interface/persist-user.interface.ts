import { User } from '@prisma/client';

export interface IPersistUserService {
  persist: (
    username: string,
    password: string,
  ) => Promise<Omit<User, 'password'>>;
}
