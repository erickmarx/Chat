import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { IHashPasswordService } from '../interface/hash-password.interface';

@Injectable()
export class HashPasswordService implements IHashPasswordService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
