import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  Length,
} from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 16)
  // 최소 8자 및 최대 16자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message: '비밀번호 양식에 맞게 작성하세요.',
    },
  )
  password: string; // 비밀번호

  // @IsString()
  // @IsNotEmpty()
  // @Length(8, 16)
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  //   {
  //     message: '비밀번호 양식에 맞게 작성하세요.',
  //   },
  // )
  // password_2: string; // 비밀번호 확인 - 유효성 검사를 위한 필드
}
