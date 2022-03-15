import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberDto } from 'src/dto/create-member.dto';
import { UpdateMemberDto } from 'src/dto/update-member.dto';
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
    // console.log(' email: ', email);
    // console.log(' password: ', password);
    const member = await this.memberModel
      .findOne({ email: email, password: password })
      .exec();
    if (!member) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }
    return member;
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = new this.memberModel(createMemberDto);
    return newMember.save();
  }

  async update(email: string, updateMemberDto: UpdateMemberDto) {
    const existMember = await this.memberModel.updateOne(
      { email: email },
      updateMemberDto,
    );
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
