import { JwtPayload } from '@/@types/types/jwt-payload.type';
import { JwtSignType } from '@/@types/types/jwt-sign.type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtSignService } from '../interface/jwt-sign.interface';

@Injectable()
export class JwtSignService implements IJwtSignService {
  constructor(private jwtService: JwtService) {}
  sign(payload: JwtPayload): JwtSignType {
    return { accessToken: this.jwtService.sign(payload) };
  }
}
