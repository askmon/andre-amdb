import { IsNotEmpty, IsString, IsEmail, IsDefined } from 'class-validator';

export class UserAuthenticationRequest {

  @IsString()
  username?: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}
