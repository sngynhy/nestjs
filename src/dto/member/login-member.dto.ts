import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginMemberDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
