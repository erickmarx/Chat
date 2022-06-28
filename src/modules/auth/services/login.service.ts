import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { ILoginService } from '../interface/login.service.interface';

@Injectable()
export class LoginService implements ILoginService {
  async validate(password: string, hashedPassword: string): Promise<boolean> {
    const compare = await bcrypt.compare(password, hashedPassword);
    if (!compare) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
