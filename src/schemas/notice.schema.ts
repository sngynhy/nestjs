import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Member } from './member.schema';

export type NoticeDocument = Notice & Document;

@Schema({ timestamps: true })
export class Notice {
  @Prop({ required: true })
  category!: string; // 카테고리> 전체, 보도자료, 설치 및 업데이트, 이벤트, 기타

  @Prop({ required: true })
  title!: string; // 제목

  @Prop({ required: true })
  content!: string; // 내용

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Member.name,
    required: true,
  })
  member_id!: Member; // 작성자 - 관리자

  @Prop({ default: false })
  importance: boolean; // 중요 체크

  @Prop({ required: true, default: 0 })
  right!: number; // 접근권한> 모두(0, 기본값), 영업담당자(1)

  @Prop({ default: false })
  uploadReserve: boolean; // 업로드방법(flag)> 지금(false), 예약(true)

  @Prop()
  noticeDate?: Date; // 발행 날짜

  @Prop({ default: Date.now })
  createdAt!: Date; // 게시글 작성 날짜

  @Prop()
  updatedAt: Date; // 게시글 수정 날짜

  @Prop()
  fileUrl?: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
