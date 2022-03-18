import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoticeDto {
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  @IsString()
  @IsNotEmpty()
  readonly department: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string; // 비밀번호

  @IsString()
  @IsNotEmpty()
  readonly password_2: string; // 비밀번호 확인 - 유효성 검사를 위한 필드
}
