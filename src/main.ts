import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

// npm run start:dev -> main.ts 실행 -> NestApplication 생성 -> 서버 실행 -> AppModule 등록 (AppModule에 등록된 모드 코드가 등록)
