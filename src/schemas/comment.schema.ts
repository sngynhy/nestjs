import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Member } from './member.schema';
import { QnA } from './qna.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  content!: string; // 내용

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  member_id!: Member; // 작성자 - 영업담당자

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QnA' })
  qna_id!: QnA; // 해당 문의글

  @Prop({ default: Date.now })
  createdAt!: Date; // 댓글 작성 날짜

  @Prop()
  updatedAt: Date; // 댓글 수정 날짜
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
