import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// AuthGuard() : Guard의 전략을 실행시켜주는 함수가 내장된 라이브러리
// Guard 실행 시 jwt.strategy.ts 코드를 실행시켜서 Guard 에 필요한 로직이 실행될 수 있도록 도와주는 역할!

/*
 해당 파일인 Guard 통과 후 컨트롤러에 도달 -> 본격적으로 요청 처리 시작
 Guard란? 단일 책임으로 런타임에 존재하는 특정 조건(권한, 역할 등)에 따라 지정된 요청을 라우터 핸들러에 의해 처리할지 여부를 결정
        (단일책임? 한 클래스는 하나의 책임을 가지는 것)
 미들웨어는 본질적으로 멍청해서, next() 함수를 호출한 후 어떤 핸들러가 실행되는지 알 수 없다.
 반대로 가드는 다음에 실행될 작업을 명확하게 알고 있다. 따라서 정확한 지점에서 처리 로직을 넣을 수 있고, 수행할 수 있도록 한다.
 Guard는 글로벌, 컨트롤러, 라우트로 나뉘는데 이는 Guard 를 개발자가 어디에 설정하느냐에 따라서
 글로벌로 작동하기도 하고, 컨트롤러에서만 작동하기도 하게 된다.
*/
