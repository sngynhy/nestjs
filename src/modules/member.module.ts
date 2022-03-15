import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberController } from '../controllers/member.controller';
import { MemberService } from '../services/member.service';
import { Member, MemberSchema } from '../schemas/member.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    // session을 사용하지 않을 예정이기 때문에 false
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // jwt 생성할 때 사용할 시크릿 키와 만료일자 적어주기
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [MemberController],
  providers: [MemberService, JwtStrategy],
})
export class MemberModule {}
