import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import document from 'mongoose';

export type UserDocument = User & Document;

@Schema() // 해당 클래스를 스키마로 정의
export class User {
  // 해당 클래스를 Users 이름의 MongoDB 컬렉션에 매핑

  @Prop() // document의 속성 정의
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
