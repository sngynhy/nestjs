import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //Request에서 JWT 토큰 추출하는 방법 설정 -> Authorization에서 Bearer Token에 JWT 토큰을 담아 전송해야한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Header Authentication에서 Bearer 토큰으로부터 jwt를 추출하겠다는 의미
      secretOrKey: jwtConstants.secret, // jwt 생성시 비밀키로 사용할 텍스트 (노출 X)
      ignoreExpiration: false, //true로 설정하면 Passport에 토큰 검증을 위임하지 않고 직접 검증, false는 Passport에 검증 위임 (기본값: false)
    });
  }

  // 토큰 검증이 완료되면 validation() 실행
  // 토큰 만료 or 문제 발생 시 Passport는 Error를 발생시킴 (단, 예외처리는 직접 구현해야 함)
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

/**
  jwt.strategy.ts 코드는 Guard의 전략을 담은 코드로 Strategy 내부의 validate 함수가 실행되면서 인증 절차를 거치게 된다.
 */
