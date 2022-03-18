import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/services/member.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {}

  async validateMember(email: string, password: string): Promise<any> {
    // console.log(' AuthService');
    const member = await this.memberService.login(email, password);
    console.log('member : ', member);
    // 사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    if (!!member && !!member.password && member.password === password) {
      const { password, ...result } = member;

      // 유저 정보를 통해 토큰 값 생성
      const access_token = await this.jwtService.sign(result);

      // 토큰 값 추가
      result['token'] = access_token;

      console.log(' result: ', result);

      // 비밀번호를 제외하고 유저 정보를 반환
      return result;
    }
    return null;
  }

  // async login(member: any) {
  //   // const payload = { email: member.email, sub: '0' };
  //   const payload = { email: member.email };
  //   // 로그인 성공 시 JWT 토큰 생성 후 사용자에게 반환
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
