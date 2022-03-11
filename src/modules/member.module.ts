import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberController } from '../controllers/member.controller';
import { MemberService } from '../services/member.service';
import { Member, MemberSchema } from '../schemas/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
