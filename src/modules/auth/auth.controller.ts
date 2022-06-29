import { LoginDTO } from '@/@types/dto/login.dto';
import { RegisterDTO } from '@/@types/dto/register.dto';
import { JwtSignType } from '@/@types/types/jwt-sign.type';
import { AuthServices } from '@/config/services/auth';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthController } from './interface/auth.controller.interface';
import { IGetUserService } from './interface/get-user.service.interface';
import { IHashPasswordService } from './interface/hash-password.interface';
import { IJwtSignService } from './interface/jwt-sign.interface';
import { ILoginService } from './interface/login.service.interface';
import { IPersistUserService } from './interface/persist-user.interface';
import { Public } from './jwt-auth.guard';

@Controller({ path: 'auth' })
export class AuthController implements IAuthController {
  constructor(
    @Inject(AuthServices.GetUser) private getUserService: IGetUserService,
    @Inject(AuthServices.Login) private loginService: ILoginService,
    @Inject(AuthServices.HashPassword)
    private hashPasswordService: IHashPasswordService,
    @Inject(AuthServices.PersistUser)
    private persistUserService: IPersistUserService,
    @Inject(AuthServices.JwtSign) private jwtSignService: IJwtSignService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDTO): Promise<JwtSignType> {
    try {
      const user = await this.getUserService.getWithPassword(body.username);
      await this.loginService.validate(body.password, user.password);
      return this.jwtSignService.sign(user);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDTO): Promise<JwtSignType> {
    try {
      const hashedPassword = await this.hashPasswordService.hash(body.password);
      const user = await this.persistUserService.persist(
        body.username,
        hashedPassword,
      );
      return this.jwtSignService.sign(user);
    } catch (err) {
      throw err;
    }
  }
}
