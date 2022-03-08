import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot(config.mongoURI)],
})
export class AppModule {}

// forRoot() 메소드는 Mongoose 패키지의 mongoose.connect() 와 동일한 구성 객체를 허용
