import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QnA, QnASchema } from './qna.schema';

export type MemberDocument = Member & Document;

@Schema({ timestamps: true }) // 해당 클래스를 스키마로 정의
export class Member {
  @Prop({ required: true, unique: true })
  email!: string; // 이메일

  @Prop({ required: true })
  password!: string; // 비밀번호

  @Prop({ required: true })
  name!: string; // 이름

  @Prop({ required: true })
  position!: string; // 회원구분> 영업담당자, 관리자

  @Prop({ required: true })
  department!: string; // 부서

  @Prop()
  profileUrl?: string; // 프로필사진

  @Prop({ default: Date.now })
  createdAt!: Date; // 회원 등록 날짜

  @Prop()
  updatedAt: Date; // 회원 정보 수정 날짜

  @Prop({ type: QnASchema })
  qna?: QnA; // QnA collection embedded
}

export const MemberSchema = SchemaFactory.createForClass(Member);
