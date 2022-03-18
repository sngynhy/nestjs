import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Member } from './member.schema';
import { Comment, CommentSchema } from './comment.schema';

export type QnADocument = QnA & Document;

@Schema({ timestamps: true })
export class QnA {
  @Prop({ required: true })
  status!: string; // 처리 상태> 전체, 접수완료, 답변완료

  @Prop({ required: true })
  title!: string; // 제목

  @Prop({ required: true })
  content!: string; // 내용

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  member_id!: Member; // 작성자 - 영업담당자

  @Prop({ default: Date.now })
  createdAt!: Date; // 게시글 작성 날짜

  @Prop()
  updatedAt: Date; // 게시글 수정 날짜

  @Prop({ type: CommentSchema })
  comment?: Comment; // comment collection embedded
}

export const QnASchema = SchemaFactory.createForClass(QnA);
