import { BadRequestException, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/infra/database/mongoose/models/user.model';

@Controller('user')
export class UserController {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  @Get('login/:username')
  async simpleLogin(@Param('username') username: string) {
    if (!username) throw new BadRequestException('username is required');

    let user = await this.userModel.findOne(
      { username },
      { username: 1, uuid: 1 },
    );

    if (!user) user = await this.createUser(username);

    return { username: user.username, uuid: user.uuid };
  }

  private async createUser(username: string) {
    return this.userModel.create(username);
  }
}
