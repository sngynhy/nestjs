import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MemberDocument = Member & Document;

@Schema() // 해당 클래스를 스키마로 정의
export class Member {
  @Prop()
  position: string;

  @Prop()
  department: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
