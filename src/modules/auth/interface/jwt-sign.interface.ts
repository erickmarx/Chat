import { JwtPayload } from '@/@types/types/jwt-payload.type';
import { JwtSignType } from '@/@types/types/jwt-sign.type';

export interface IJwtSignService {
  sign: (payload: JwtPayload) => JwtSignType;
}
