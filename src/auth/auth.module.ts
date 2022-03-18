import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MemberModule } from 'src/modules/member.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    MemberModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, // 토큰 서명 값 설정 - 유출 주의
      signOptions: { expiresIn: '600s' }, // 토큰 유효시간 (임의 60초)
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
