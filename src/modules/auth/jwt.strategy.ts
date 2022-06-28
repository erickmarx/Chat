import { jwtConstants } from '@/config/global.config';
import { AuthServices } from '@/config/services/auth';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IGetUserService } from './interface/get-user.service.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthServices.GetUser) private getUserService: IGetUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate({ username }: { username: string }) {
    try {
      return await this.getUserService.getWithoutPassword(username);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
