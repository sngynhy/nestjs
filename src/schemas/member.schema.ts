import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MemberDocument = Member & Document;

@Schema() // 해당 클래스를 스키마로 정의
export class Member {
  @Prop()
  position: string; // 회원구분> 영업담당자, 관리자

  @Prop()
  department: string; // 부서

  @Prop()
  name: string; // 이름

  @Prop({ unique: true })
  email: string; // 이메일

  @Prop()
  password: string; // 비밀번호

  @Prop()
  profileImage: string; // 프로필사진
}

export const MemberSchema = SchemaFactory.createForClass(Member);
