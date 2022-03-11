import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Member } from './member.schema';

export type NoticeDocument = Notice & Document;
// Inquiry
@Schema()
export class Notice {
  @Prop()
  _no: number;

  @Prop()
  state: string; // 처리 상태

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  uploadDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  writer: Member;

  @Prop([String])
  tags: string[];
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
