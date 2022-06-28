import { LoginDTO } from '@/@types/dto/login.dto';
import { AuthServices } from '@/config/services/auth';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthController } from './interface/auth.controller.interface';
import { IGetUserService } from './interface/get-user.service.interface';
import { IHashPasswordService } from './interface/hash-password.interface';
import { ILoginService } from './interface/login.service.interface';
import { IPersistUser } from './interface/persist-user.interface';
import { Public } from './jwt-auth.guard';

@Controller({ path: 'auth' })
export class AuthController implements IAuthController {
  constructor(
    @Inject(AuthServices.GetUser) private getUserService: IGetUserService,
    @Inject(AuthServices.Login) private loginService: ILoginService,
    @Inject(AuthServices.HashPassword)
    private hashPasswordService: IHashPasswordService,
    @Inject(AuthServices.PersistUser) private persistUser: IPersistUser,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDTO) {
    try {
      const user = await this.getUserService.getWithPassword(body.username);
      return this.loginService.validate(body.password, user.password);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post('register')
  async register(@Body() body: LoginDTO) {
    const hashedPassword = await this.hashPasswordService.hash(body.password);
    return await this.persistUser.persist(body.username, hashedPassword);
  }
}
