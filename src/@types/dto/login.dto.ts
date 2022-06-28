import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  password: string;
}
