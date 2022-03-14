import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Member } from './member.schema';

export type NoticeDocument = Notice & Document;

@Schema()
export class Notice {
  // @Prop()
  // notice_no: number; // 게시글 번호

  @Prop()
  category: string; // 카테고리> 전체, 보도자료, 설치 및 업데이트, 이벤트, 기타

  @Prop()
  access: number; // 접근권한> 모두(1), 영업담당자(0)

  // @Prop()
  // uploadReserve: boolean; // 업로드방법> 지금(false), 예약(true)

  @Prop({ default: Date.now })
  createdAt: Date; // 게시글 작성 날짜

  @Prop()
  updatedAt: Date; // 게시글 수정 날짜

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member.email' })
  writer: Member; // 작성자

  @Prop()
  important: boolean; // 중요도 체크

  @Prop()
  title: string; // 제목

  @Prop()
  content: string; // 내용

  @Prop()
  uploadfile: string; // 첨부파일

  @Prop([String])
  tags: string[]; // 태그
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
