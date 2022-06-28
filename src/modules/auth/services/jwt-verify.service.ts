import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtVerifyService } from '../interface/jwt-verify.interface';

@Injectable()
export class JwtVerifyService implements IJwtVerifyService {
  constructor(private jwtService: JwtService) {}
  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
