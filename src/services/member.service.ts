import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberDto } from 'src/dto/member/create-member.dto';
import { UpdateMemberDto } from 'src/dto/member/update-member.dto';
import { Member } from 'src/schemas/member.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<Member>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberModel.find().exec();
  }

  async findOne(email: string): Promise<Member> {
    const member = await this.memberModel.findOne({ email: email }).exec();
    if (!member) {
      throw new NotFoundException(`Member #${email} not found`);
    }
    return member;
  }

  // 로그인
  async login(email: string, password: string): Promise<Member> {
    const member = await this.memberModel
      .findOne({ email: email, password: password })
      .exec();
    if (!member) {
      throw new UnauthorizedException('아이디와 비밀번호를 다시 확인해주세요.');
    }
    return member;
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = new this.memberModel(createMemberDto);
    return newMember.save();
  }

  async update(
    email: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const existMember = await this.memberModel
      .findOneAndUpdate({ email: email }, updateMemberDto)
      .exec();
    if (!existMember) {
      throw new NotFoundException(`Member #${email} not found`);
    }
    return existMember;
  }

  async delete(email: string) {
    const deleteMember = await this.memberModel.findOneAndDelete({
      email: email,
    });
    return deleteMember;
  }
}
