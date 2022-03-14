import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { MemberModule } from './modules/member.module';
import { NoticeModule } from './modules/notice.module';

@Module({
  imports: [
    MemberModule,
    MongooseModule.forRoot(config.mongoURI),
    NoticeModule,
  ],
})
export class AppModule {}

// forRoot() 메소드는 Mongoose 패키지의 mongoose.connect() 와 동일한 구성 객체 허용
